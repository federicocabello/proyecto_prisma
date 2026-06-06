from flask import Blueprint, jsonify

public_bp = Blueprint("public", __name__)

@public_bp.route("/test", methods=["GET"])
def test():
    return jsonify({
        "success": True,
        "message": "Backend de Proyecto Prisma conectado correctamente"
    })