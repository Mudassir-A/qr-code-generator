import base64
import json
import io
import pyqrcode

def handler(event, context):
    # Parse request body
    try:
        body = json.loads(event["body"])
        url = body.get("url", "")

        if not url:
            return {
                "statusCode": 400, 
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({"error": "URL is required"})
            }

        # Generate QR code
        qr = pyqrcode.create(url)

        # Create PNG in memory
        buffer = io.BytesIO()
        qr.png(buffer, scale=6)
        buffer.seek(0)

        # Encode as base64
        image_base64 = base64.b64encode(buffer.read()).decode("utf-8")

        # Return the image data
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"image": f"data:image/png;base64,{image_base64}"})
        }

    except Exception as e:
        return {
            "statusCode": 500, 
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": str(e)})
        }

