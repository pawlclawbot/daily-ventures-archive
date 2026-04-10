import json
import os
import sys
import urllib.request
from pathlib import Path

AGENTMAIL_API = 'https://api.agentmail.to'


def send_email(to_email: str, subject: str, body: str, from_inbox: str):
    key = os.environ['AGENTMAIL_API_KEY']
    payload = {
        'to': [to_email],
        'subject': subject,
        'text': body,
    }
    req = urllib.request.Request(
        f'{AGENTMAIL_API}/v0/inboxes/{from_inbox}/messages',
        data=json.dumps(payload).encode(),
        headers={
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json',
        },
    )
    with urllib.request.urlopen(req) as r:
        return json.load(r)


if __name__ == '__main__':
    if len(sys.argv) != 5:
        print('usage: python send_packet.py <to_email> <subject> <packet_path> <from_inbox>')
        sys.exit(1)
    to_email, subject, packet_path, from_inbox = sys.argv[1:5]
    body = Path(packet_path).read_text()
    resp = send_email(to_email, subject, body, from_inbox)
    print(json.dumps(resp, indent=2))
