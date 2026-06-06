import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

    CORS(app)

    from app.routes.public_routes import public_bp

    app.register_blueprint(public_bp, url_prefix="/api/public")

    return app