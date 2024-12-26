from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app)

# Load models into memory
models = {}


def load_models():
    model_path = {
        "InceptionV3": "model/InceptionV3_Orignal_Data.keras",
        "InceptionResNet": "model/Inception_ResNet_Orignal_Data.keras",
        "ResNet50": "model/DenseNet_Orignal_Data.keras",
        "VGG16": "model/VGG16_Orignal_Data.keras",
    }

    # Ensure all models are loaded into memory
    for name, path in model_path.items():
        models[name] = tf.keras.models.load_model(path)
    print("Models loaded successfully.")


# Load models on server startup
load_models()


@app.route('/predict', methods=['POST'])
def predict():
    species_dict = {1: 'Aloevera', 2: 'Ashoka', 3: 'Betel', 4: 'Curry_Leaf', 5: 'Tulsi'}

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

        # Predict using loaded models
        predictions_inception_v3 = models["InceptionV3"].predict(image_tensor299)
        predictions_inception_resnet = models["InceptionResNet"].predict(image_tensor299)
        predictions_resnet50 = models["ResNet50"].predict(image_tensor224)
        predictions_vgg16 = models["VGG16"].predict(image_tensor224)

        # Combine all model predictions
        predictions = np.array(
            [predictions_inception_v3, predictions_inception_resnet, predictions_resnet50, predictions_vgg16])

        # Get the index of the highest prediction across all models
        # Flatten to 1D for easier access
        highest_predictions = np.argmax(predictions, axis=2).flatten()

        # Find the species corresponding to the highest prediction
        # +1 because species_dict is 1-indexed
        species = [species_dict.get(pred+1, "Unknown") for pred in highest_predictions]
        result = max(set(species), key=species.count)

        return jsonify({"name": result})
        # return (result);

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
