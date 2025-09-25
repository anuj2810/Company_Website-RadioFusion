from twilio.rest import Client
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_whatsapp_message(to_number, message):
    """
    Send WhatsApp message using Twilio API
    
    Args:
        to_number (str): Phone number in format +1234567890
        message (str): Message content to send
    
    Returns:
        bool: True if message sent successfully, False otherwise
    """
    try:
        # Initialize Twilio client
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        
        # Ensure phone number has proper format
        if not to_number.startswith('+'):
            to_number = '+' + to_number.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
        
        # Send WhatsApp message
        message = client.messages.create(
            body=message,
            from_=f'whatsapp:{settings.TWILIO_WHATSAPP_NUMBER}',
            to=f'whatsapp:{to_number}'
        )
        
        logger.info(f"WhatsApp message sent successfully. SID: {message.sid}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send WhatsApp message: {str(e)}")
        return False


def send_admin_whatsapp_notification(name, email, phone):
    """
    Send WhatsApp notification to admin about new contact form submission
    
    Args:
        name (str): Contact person's name
        email (str): Contact person's email
        phone (str): Contact person's phone
    
    Returns:
        bool: True if notification sent successfully, False otherwise
    """
    message = f"New contact request from {name}. Email: {email}, Phone: {phone}."
    
    try:
        admin_phone = getattr(settings, 'ADMIN_WHATSAPP_NUMBER', None)
        if not admin_phone:
            logger.warning("ADMIN_WHATSAPP_NUMBER not configured in settings")
            return False
            
        return send_whatsapp_message(admin_phone, message)
    except Exception as e:
        logger.error(f"Failed to send admin WhatsApp notification: {str(e)}")
        return False


def send_user_whatsapp_confirmation(name, phone):
    """
    Send WhatsApp confirmation to user after contact form submission
    
    Args:
        name (str): Contact person's name
        phone (str): Contact person's phone
    
    Returns:
        bool: True if confirmation sent successfully, False otherwise
    """
    message = f"Hello {name}, thanks for contacting Radiofusion Global. We will reach out shortly."
    
    try:
        return send_whatsapp_message(phone, message)
    except Exception as e:
        logger.error(f"Failed to send user WhatsApp confirmation: {str(e)}")
        return False


def format_phone_number(phone):
    """
    Format phone number for WhatsApp (ensure it starts with +)
    
    Args:
        phone (str): Phone number in various formats
    
    Returns:
        str: Formatted phone number starting with +
    """
    # Remove all non-digit characters except +
    import re
    cleaned = re.sub(r'[^\d\+]', '', phone)
    
    # If it doesn't start with +, add it
    if not cleaned.startswith('+'):
        # Assume Indian number if no country code
        if len(cleaned) == 10:
            cleaned = '+91' + cleaned
        else:
            cleaned = '+' + cleaned
    
    return cleaned