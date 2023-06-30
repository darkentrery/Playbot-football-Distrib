from django import forms
from django.contrib.auth.forms import UserChangeForm
from django.forms import EmailField


class UserCustomForm(UserChangeForm):
    def __init__(self, *args, **kwargs):
        super(UserCustomForm, self).__init__(*args, **kwargs)
        self.fields["email"] = EmailField(
            widget=forms.EmailInput(attrs={}),
            required=False,
        )
