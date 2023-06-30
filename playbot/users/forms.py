from django import forms
from django.contrib.auth.forms import UserChangeForm, UsernameField


class UserCustomForm(UserChangeForm):
    def __init__(self, *args, **kwargs):
        super(UserCustomForm, self).__init__(*args, **kwargs)
        self.fields["email"] = UsernameField(
            widget=forms.EmailInput(attrs={}),
            required=False
        )
