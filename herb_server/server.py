from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import tensorflow as tf
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

# Load models into memory (only once)
models = {}


def load_model(name):
    model_path = {
        "InceptionV3": "model/InceptionV3_Orignal_Data.keras",
        "InceptionResNet": "model/Inception_ResNet_Orignal_Data.keras",
        # Correct the model path if needed
        "ResNet50": "model/ResNet50_Orignal_Data.keras",
        "VGG16": "model/VGG16_Orignal_Data.keras",
    }

    if name not in model_path:
        raise ValueError(f"Model '{name}' not found. Available models: {list(model_path.keys())}")

    if name not in models:
        models[name] = tf.keras.models.load_model(model_path[name])

    return models[name]


@app.route('/predict', methods=['POST'])
def predict():
    species_dict = {1: 'Aloevera', 2: 'Ashoka',
                    3: 'Betel', 4: 'Curry_Leaf', 5: 'Tulsi'}

    try:
        # Receive Image data as base64 string
        data = request.get_json()
        if "imageBuffer" not in data:
            return jsonify({"error": "No imageBuffer provided"}), 400

        # Convert base64 string to numpy array for image processing
        image_buffer = base64.b64decode(data["imageBuffer"])

        # Decode image and resize it for predictions
        image = tf.image.decode_image(image_buffer, channels=3)
        image_resized224 = tf.image.resize(image, [224, 224])
        image_resized299 = tf.image.resize(image, [299, 299])
        image_tensor224 = tf.expand_dims(image_resized224, 0)
        image_tensor299 = tf.expand_dims(image_resized299, 0)

        # List of models to use for predictions
        model_names = ["InceptionV3", "InceptionResNet", "ResNet50", "VGG16"]

        # Predict using loaded models
        predictions = []
        for model_name in model_names:
            model = load_model(model_name)
            if model_name in ["InceptionV3", "InceptionResNet"]:
                predictions.append(model.predict(image_tensor299))
            else:
                predictions.append(model.predict(image_tensor224))

        # Combine all model predictions into a single array
        predictions = np.array(predictions)

        # Find the index of the highest prediction across all models
        highest_predictions = np.argmax(predictions, axis=2).flatten()

        # Map prediction indices to species
        species = [species_dict.get(pred + 1, "Unknown")for pred in highest_predictions]

        # Determine the most common species
        result = max(set(species), key=species.count)

        return jsonify({"name": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


port = int(os.getenv("PORT", 5000))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)
