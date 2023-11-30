from flask import render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from app import app, db, login_manager, bcrypt 
from app.models import UserCard, User


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/user_card', methods=['POST'])
@login_required
def update_user_card():
    try:
        data = request.get_json()

        card_id = data.get('card_id')
        set_id = data.get('set_id')
        variant = data.get('variant')
        condition = data.get('condition')
        quantity = max(data.get('quantity'), 0)

        # Check if the user card exists
        user_card = UserCard.query.filter_by(
            user_id=current_user.user_id,
            card_id=card_id,
            set_id=set_id,
            variant=variant,
            condition=condition
        ).first()


        
        if user_card:
            print('we found user card', user_card)
            user_card.quantity = quantity
        else:
            print('we create user card')
            user_card = UserCard(
                user_id=current_user.user_id,
                card_id=card_id,
                set_id=set_id,
                variant=variant,
                condition=condition,
                quantity=quantity
            )

        db.session.merge(user_card)
        db.session.commit()

        response = {
            'status': 'success',
            'message': 'Quantity updated successfully',
            'data': {
                'card_id': card_id,
                'set_id': card_id,
                'variant': variant,
                'condition': condition,
                'quantity': quantity,
            }
        }
        return jsonify(response), 200
    except Exception as e:
        error_message = str(e)
        response = {
            'status': 'error',
            'message': 'Failed to update quantity',
            'error': error_message
        }
        return jsonify(response), 500
    
@app.route('/user_card', methods=['GET'])
@login_required
def get_user_card():
    card_id = request.args.get('card_id')
    set_id = request.args.get('set_id')

    cards = UserCard.query.filter(
        UserCard.user_id == current_user.user_id,
        UserCard.card_id == card_id,
        UserCard.set_id == set_id
    ).all()

    response = {
            'status': 'success',
            'message': '',
            'data': {
                'cards': [card.serialize() for card in cards]
            }
        }
    return jsonify(response), 200
    

@app.route('/')
def home():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))

    return render_template('series.html', user=current_user)

@app.route("/expansions")
def series():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))

    return render_template('series.html', user=current_user)

@app.route("/expansions/<set_id>")
def sets(set_id):
    if not current_user.is_authenticated:
        return redirect(url_for('login'))

    return render_template('set.html', user=current_user)

@app.route("/expansions/<set_id>/<card_id>")
def cards(set_id, card_id):
    if not current_user.is_authenticated:
        return redirect(url_for('login'))

    return render_template('card.html', user=current_user)

@app.route('/signup', methods=['GET', 'POST'])
def sign_up():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if password == confirm_password:
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(email=email, password=hashed_password)
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created! You can now log in.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Passwords do not match.', 'danger')

    return render_template('sign_up.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    print("1")
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        print("2")

        user = User.query.filter_by(email=email).first()
        if not user:
            return render_template('login.html', error='User not found')
        elif user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('home'))
        else:
            render_template('login.html', error='Error')

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))
