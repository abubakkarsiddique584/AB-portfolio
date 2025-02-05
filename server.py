import os
from flask import Flask, render_template, request, flash
from dotenv import load_dotenv
from flask_mail import Mail, Message
from datetime import datetime

# Load environment variables from .env.txt
load_dotenv(dotenv_path='.env.txt')

# Initialize Flask app
app = Flask(__name__)

# Secret key for session handling
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# Set up Flask-Mail for email sending
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465  # For SSL
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

# Initialize Mail object
mail = Mail(app)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Get form data
        subject = request.form.get('subject')
        sender = request.form.get('email')
        message_body = request.form.get('message')

        try:
            # Send email using Flask-Mail
            msg = Message(subject,
                          sender=sender,
                          recipients=[os.getenv('MAIL_USERNAME')])
            msg.body = message_body
            mail.send(msg)

            # If successful, flash a success message
            flash("Your message has been sent successfully!", "success")

        except Exception as e:
            # If there's an error, flash an error message
            flash(f"There was an error sending the email: {e}", "error")

    return render_template('index.html')
@app.route('/')
def home():
    current_year = datetime.now().year  # Get the current year
    return render_template('index.html', ye=current_year)


if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0')

