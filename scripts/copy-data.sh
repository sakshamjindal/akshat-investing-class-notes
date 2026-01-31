#!/bin/bash
# Copy session data from the main data directory into public/data/
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="$(dirname "$WEB_DIR")/data"

mkdir -p "$WEB_DIR/public/data/sessions"
mkdir -p "$WEB_DIR/public/data/docs"
mkdir -p "$WEB_DIR/public/data/frames"

echo "Copying session JSONs..."
cp "$DATA_DIR/class_docs/"*_session.json "$WEB_DIR/public/data/sessions/"

echo "Copying markdown docs..."
cp "$DATA_DIR/class_docs/"*.md "$WEB_DIR/public/data/docs/"

echo "Copying frames..."
cp -r "$DATA_DIR/frames/"* "$WEB_DIR/public/data/frames/"

echo "Done. Data copied to public/data/"
