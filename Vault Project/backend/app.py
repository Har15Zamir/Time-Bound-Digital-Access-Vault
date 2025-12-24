from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
import sqlite3
import hashlib
import uuid
from datetime import datetime

app = Flask(__name__)
DATABASE = "database.db"

def get_db():
    return sqlite3.connect(DATABASE, check_same_thread=False)

def hash_text(text):
    return hashlib.sha256(text.encode()).hexdigest()

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "missing data"}), 400

    db = get_db()
    cur = db.cursor()

    try:
        cur.execute(
            "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)",
            (email, hash_text(password), datetime.utcnow().isoformat())
        )
        db.commit()
        return jsonify({"message": "registered"}), 201
    except:
        return jsonify({"error": "user exists"}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    db = get_db()
    cur = db.cursor()

    cur.execute(
        "SELECT id, password_hash FROM users WHERE email = ?",
        (email,)
    )
    user = cur.fetchone()

    if not user or user[1] != hash_text(password):
        return jsonify({"error": "invalid credentials"}), 401

    token = str(uuid.uuid4())
    return jsonify({"token": token, "user_id": user[0]}), 200

@app.route("/vault", methods=["POST"])
def create_vault():
    data = request.json
    title = data.get("title")
    content = data.get("content")
    owner_id = data.get("owner_id")

    if not title or not content or not owner_id:
        return jsonify({"error": "missing data"}), 400

    db = get_db()
    cur = db.cursor()

    cur.execute(
        "INSERT INTO vault_items (title, content, owner_id, created_at) VALUES (?, ?, ?, ?)",
        (title, content, owner_id, datetime.utcnow().isoformat())
    )
    db.commit()

    return jsonify({"message": "vault created"}), 201

@app.route("/vault", methods=["GET"])
def list_vaults():
    owner_id = request.args.get("owner_id")

    db = get_db()
    cur = db.cursor()

    cur.execute(
        "SELECT id, title, created_at FROM vault_items WHERE owner_id = ?",
        (owner_id,)
    )
    items = cur.fetchall()

    return jsonify(items), 200

@app.route("/vault/<int:vault_id>/share", methods=["POST"])
def create_share(vault_id):
    data = request.json
    expires_at = data.get("expires_at")
    max_views = data.get("max_views")
    password = data.get("password")

    token = str(uuid.uuid4())
    password_hash = hash_text(password) if password else None

    db = get_db()
    cur = db.cursor()

    cur.execute("""
        INSERT INTO share_links
        (vault_id, token, expires_at, max_views, password_hash, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        vault_id,
        token,
        expires_at,
        max_views,
        password_hash,
        datetime.utcnow().isoformat()
    ))

    db.commit()
    return jsonify({"share_token": token}), 201

@app.route("/share/<token>", methods=["POST"])
def access_share(token):
    data = request.json or {}
    password = data.get("password")
    ip = request.remote_addr

    db = get_db()
    cur = db.cursor()

    cur.execute(
        "SELECT id, vault_id, expires_at, max_views, views_used, password_hash FROM share_links WHERE token = ?",
        (token,)
    )
    link = cur.fetchone()

    if not link:
        return jsonify({"error": "invalid link"}), 404

    link_id, vault_id, expires_at, max_views, views_used, password_hash = link

    if datetime.utcnow() > datetime.fromisoformat(expires_at):
        result = "DENIED"
    elif views_used >= max_views:
        result = "DENIED"
    elif password_hash and hash_text(password or "") != password_hash:
        result = "DENIED"
    else:
        result = "ALLOWED"
        cur.execute(
            "UPDATE share_links SET views_used = views_used + 1 WHERE id = ?",
            (link_id,)
        )

    cur.execute(
        "INSERT INTO access_logs (vault_id, token, timestamp, result, ip) VALUES (?, ?, ?, ?, ?)",
        (vault_id, token, datetime.utcnow().isoformat(), result, ip)
    )

    db.commit()

    if result == "DENIED":
        return jsonify({"error": "access denied"}), 403

    cur.execute(
        "SELECT content FROM vault_items WHERE id = ?",
        (vault_id,)
    )
    content = cur.fetchone()[0]

    return jsonify({"content": content}), 200

@app.route("/vault/<int:vault_id>/logs", methods=["GET"])
def view_logs(vault_id):
    db = get_db()
    cur = db.cursor()

    cur.execute(
        "SELECT timestamp, result, ip FROM access_logs WHERE vault_id = ?",
        (vault_id,)
    )
    logs = cur.fetchall()

    return jsonify(logs), 200

if __name__ == "__main__":
    app.run(debug=True)
