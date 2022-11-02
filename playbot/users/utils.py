import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_message(recipient, new_password):
    server = "smtp.yandex.ru"
    user = "mikhail.badazhkov@yandex.kz"
    password = "EntreryOly1506!"

    # recipient = ["badajkovmihail@gmail.com",]
    sender = "mikhail.badazhkov@yandex.kz"
    subject = "Востановление пароля"
    text = f"Новый пароль для вашего аккаунта в Playbot: {new_password}"
    html = f"<html><head></head><body><p>{text}</p></body></html>"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Playbot <{sender}>"
    msg["To"] = ', '.join(recipient)
    msg["Reply-To"] = sender
    msg["Return-Path"] = sender

    part_text = MIMEText(text, "plain")
    part_html = MIMEText(html, "html")

    msg.attach(part_text)
    msg.attach(part_html)

    with smtplib.SMTP(server, 587) as smtpObj:
        smtpObj.starttls()
        smtpObj.login(user, password)
        smtpObj.sendmail(sender, recipient, msg.as_string())


def generate_password():
    import secrets
    import string
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(10))
    return password