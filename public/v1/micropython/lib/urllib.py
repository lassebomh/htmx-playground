
import re

pattern = re.compile(r'%([0-9a-fA-F][0-9a-fA-F])')

def _decode_percent_sequence(match):
    """Decode a percent-encoded sequence."""
    try:
        return chr(int(match.group(0)[1:], 16))
    except ValueError:
        return match.group(0)  # Return the original string if decoding fails.

def _generate_unquoted_parts(string, encoding, errors):
    return pattern.sub(lambda match: _decode_percent_sequence(match), string)

def unquote(string, encoding='utf-8', errors='replace'):
    """Replace %xx escapes by their single-character equivalent."""
    if '%' not in string:
        return string
    return _generate_unquoted_parts(string, encoding, errors)