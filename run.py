from app import app, db

if __name__ == '__main__':
    try:
        with app.app_context():
            print("Connecting to the database...")
            db.create_all()
        app.run(debug=True)
    except Exception as e:
        print(f"Error connecting to the database: {e}")

    
