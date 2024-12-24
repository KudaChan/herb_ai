import { loadModelAndPredict } from '@/utils/predict';
import { NextResponse } from 'next/server';
// Code for getting photo from client side side and analyze and predict the results

export const POST = async (req: Request): Promise<Response> => {
  try {
  const formData = await req.formData();
  const imageFile = formData.get('image');

  if (!imageFile || !(imageFile instanceof File)) {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
  }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    const result = await loadModelAndPredict(imageBuffer);

  // const result = { species: 'Aloevera' }; // Replace with actual prediction result

  return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error processing request: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
}