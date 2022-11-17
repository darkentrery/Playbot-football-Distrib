import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings
from django.template.loader import render_to_string
from loguru import logger
from sendgrid import Mail, SendGridAPIClient


def send_message(recipient, new_password):
    server = "smtp.yandex.ru"
    user = "mikhail.badazhkov@yandex.kz"
    password = "snbwtingtgforyqw"

    # server = "smtp.gmail.com"
    # user = "badajkovmihail@gmail.com"
    # password = "EntreryOly89139362589"

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


def send_email_refresh(recipient, password):
    subject = f"Востановление пароля"
    template = "refresh-password.html"


    message = Mail(
        from_email=settings.SENDGRID_DEFAULT_FROM_EMAIL,
        to_emails=recipient,
        subject=subject,
        html_content=render_to_string(template, context={"password": password})
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        logger.error(e)


def send_email_confirm_sign_up(recipient, slug):
    subject = f"Подтверждение регистрации"
    template = "confirm-sign-up.html"
    href = f"{settings.CONFIRM_REGISTRATION_DOMAIN}/confirm-sign-up/{slug}/"


    message = Mail(
        from_email=settings.SENDGRID_DEFAULT_FROM_EMAIL,
        to_emails=recipient,
        subject=subject,
        html_content=render_to_string(template, context={"href": href})
    )
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        logger.error(e)
