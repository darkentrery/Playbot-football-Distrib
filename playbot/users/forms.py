from django import forms
from django.contrib.auth.forms import UserChangeForm
from django.forms import EmailField


class UserCustomForm(UserChangeForm):
    # def __init__(self, *args, **kwargs):
    #     super(UserCustomForm, self).__init__(*args, **kwargs)
    #     self.fields["email"] = forms.CharField(
    #         widget=forms.EmailInput(attrs={}),
    #         required=False,
    #         empty_value=None
    #     )
    def clean_email(self):
        if self.cleaned_data['email'] == "":
            return None
        else:
            a = self.cleaned_data['email']
            return a


