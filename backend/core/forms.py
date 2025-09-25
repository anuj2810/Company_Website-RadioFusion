from django import forms
from .models import ContactSubmission
import re

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Your Email'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your Phone (Optional)'}),
            'subject': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Subject'}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'Your Message'}),
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Basic email validation
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
                raise forms.ValidationError("Please enter a valid email address.")
        return email

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone:
            # Remove all non-digit characters
            phone_digits = re.sub(r'\D', '', phone)
            # Check if it's a valid phone number (at least 10 digits)
            if len(phone_digits) < 10:
                raise forms.ValidationError("Please enter a valid phone number.")
        return phone

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if name:
            # Check if name contains only letters and spaces
            if not re.match(r'^[a-zA-Z\s]+$', name):
                raise forms.ValidationError("Name should only contain letters and spaces.")
            # Check minimum length
            if len(name.strip()) < 2:
                raise forms.ValidationError("Name must be at least 2 characters long.")
        return name.strip()

    def clean_subject(self):
        subject = self.cleaned_data.get('subject')
        if subject:
            # Check minimum length
            if len(subject.strip()) < 5:
                raise forms.ValidationError("Subject must be at least 5 characters long.")
            # Check maximum length
            if len(subject.strip()) > 300:
                raise forms.ValidationError("Subject must be less than 300 characters.")
        return subject.strip()

    def clean_message(self):
        message = self.cleaned_data.get('message')
        if message:
            # Check minimum length
            if len(message.strip()) < 10:
                raise forms.ValidationError("Message must be at least 10 characters long.")
        return message.strip()