import os
from datetime import timedelta

import environ

from pathlib import Path

import loguru

BASE_DIR = Path(__file__).resolve().parent.parent

ROOT_DIR = environ.Path(__file__) - 3

APPS_DIR = ROOT_DIR.path("playbot")

FRONT_DIR = ROOT_DIR.path("frontend")

env = environ.Env()

env.read_env(str(ROOT_DIR.path(".env")))

DEBUG = env.bool("DJANGO_DEBUG", False)

CORS_ORIGIN_ALLOW_ALL = True

CORS_REPLACE_HTTPS_REFERER = True

CSRF_TRUSTED_ORIGINS = env.tuple("CSRF_TRUSTED_ORIGINS")

CSRF_COOKIE_DOMAIN = env("CSRF_COOKIE_DOMAIN")

CORS_ORIGIN_WHITELIST = env.tuple("CORS_ORIGIN_WHITELIST")

CORS_ALLOW_CREDENTIALS = True

SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin-allow-popups'

TIME_ZONE = "UTC"

# LANGUAGE_CODE = "en-us"

LANGUAGE_CODE = "ru-RU"

SITE_ID = 1

USE_I18N = True

USE_L10N = True

USE_TZ = True

DATABASES = {
    'default': {
        'ENGINE': env('DJANGO_DB_ENGINE'),
        'NAME': env('POSTGRES_NAME'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'HOST': env('POSTGRES_HOST'),
        'PORT': env('POSTGRES_PORT'),
    }
}

DATABASES["default"]["ATOMIC_REQUESTS"] = True

ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"

ASGI_APPLICATION = "config.asgi.application"

CHANNEL_LAYERS = {
    "default": {
        # "BACKEND": "channels.layers.InMemoryChannelLayer",
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(env("REDIS_HOST"), env.int("REDIS_PORT"))],
        },
    },
}

SECRET_KEY = env('DJANGO_SECRET_KEY')

ALLOWED_HOSTS = env.tuple('DJANGO_ALLOWED_HOSTS')

DJANGO_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'django.contrib.gis',

]

THIRD_PARTY_APPS = [
    'loguru',
    # "core",
    # 'oauth2_provider',
    "corsheaders",
    'social_django',
    # 'channels',
    'webpush',
]

LOCAL_APPS = [
    "playbot.users.apps.UsersConfig",
    "playbot.events.apps.EventsConfig",
    "playbot.cities.apps.CitiesConfig",
    "playbot.history.apps.HistoryConfig",
    "playbot.chats.apps.ChatsConfig",
    "playbot.notices.apps.NoticesConfig",
    "playbot.telegram.apps.TelegramConfig",
    "playbot.taskapp.celery.CeleryAppConfig",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'oauth2_provider.middleware.OAuth2TokenMiddleware',
    # "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

STATIC_ROOT = str(ROOT_DIR("static"))

STATIC_URL = "/static/"

STATICFILES_DIRS = [
    str(APPS_DIR.path("static")),
    str(FRONT_DIR.path("build/static")),
    str(FRONT_DIR.path("build")),
]

STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

MEDIA_ROOT = str(APPS_DIR.path("media"))

MEDIA_URL = "/media/"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        "DIRS": [
            str(APPS_DIR.path("templates")),
            str(FRONT_DIR.path("build")),
        ],
        # 'APP_DIRS': True,
        'OPTIONS': {
            "debug": DEBUG,
            "loaders": [
                "django.template.loaders.filesystem.Loader",
                "django.template.loaders.app_directories.Loader",
            ],
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                # 'social_django.context_processors.backends',
                # 'social_django.context_processors.login_redirect',
                'django.contrib.auth.context_processors.auth',
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                'django.contrib.messages.context_processors.messages',
                # 'django.template.context_processors.csrf',
            ],
        },
    },
]

FIXTURE_DIRS = (str(APPS_DIR.path("fixtures")),)

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.AllowAny',
            'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES' : (
        # 'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
    ),
}

AUTHENTICATION_BACKENDS = (
    # 'social_core.backends.open_id.OpenIdAuth',
    # 'social_core.backends.google.GoogleOAuth2',
    # 'social_core.backends.google.GoogleOAuth',
    # 'social_core.backends.twitter.TwitterOAuth',
    # 'social_core.backends.yahoo.YahooOpenId',
    'social_core.backends.telegram.TelegramAuth',
    'django.contrib.auth.backends.ModelBackend',
    # 'oauth2_provider.backends.OAuth2Backend',
)

ADMIN_URL = "admin/"

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'users.User'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

loguru.logger.add(f"{BASE_DIR}/logs.log", level='DEBUG', format="{time} {level} {message}")

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('JWT', "Bearer"),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

CHANEL_ID = "1234"

SOCIAL_AUTH_JSONFIELD_ENABLED = True

SOCIAL_AUTH_URL_NAMESPACE = 'social'

SOCIAL_AUTH_TELEGRAM_BOT_TOKEN = env("SOCIAL_AUTH_TELEGRAM_BOT_TOKEN")

# TELEGRAM_MODERATOR_ID = env("TELEGRAM_MODERATOR_ID")

TELEGRAM_MODERATOR_ID = env.tuple("TELEGRAM_MODERATOR_ID")

LOGIN_URL = '/auth/complete/telegram/'

LOGIN_REDIRECT_URL = '/'

LOGOUT_REDIRECT_URL = '/'

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
)

# X_FRAME_OPTIONS = 'ALLOW-FROM https://telegram.org/, http://127.0.0.1/'
# X_FRAME_OPTIONS = 'ALLOW-FROM http://127.0.0.1:8000'

SENDGRID_API_KEY = env('SENDGRID_API_KEY')

SENDGRID_DEFAULT_FROM_EMAIL = env('SENDGRID_DEFAULT_FROM_EMAIL', default='mikhail.badazhkov@yandex.kz')

CONFIRM_REGISTRATION_DOMAIN = env('CONFIRM_REGISTRATION_DOMAIN')

WEBPUSH_SETTINGS = {
   "VAPID_PUBLIC_KEY": env("VAPID_PUBLIC_KEY"),
   "VAPID_PRIVATE_KEY": env("VAPID_PRIVATE_KEY"),
   "VAPID_ADMIN_EMAIL": env("VAPID_ADMIN_EMAIL"),
}

UNIX_OS = env.bool("UNIX_OS")

CELERY_BROKER_URL = f"redis://{env('REDIS_HOST')}:{env.int('REDIS_PORT')}"

CELERY_RESULT_BACKEND = f"redis://{env('REDIS_HOST')}:{env.int('REDIS_PORT')}"
