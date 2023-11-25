from flask import Flask, request, jsonify
import os
import smtplib
from email.mime.text import MIMEText
from openai import OpenAI
import time
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/send_email', methods=['POST'])
def send_email():
    receiver_email = request.args.get('receiver_email')
    question = request.args.get('question')
    messages = openai_text("CRM AI", "AI support write and run code to answer user question.", question).split('assistant:')[1].strip()
    sender_email = "gdscpython@gmail.com"
    sender_password = "pcqyhnaweuxfdysi"
    receiver_email = receiver_email
    # creds = authenticate()

    msg = MIMEText(messages)
    msg["Subject"] = "Assistant Response"
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.ehlo()
        s.starttls()
        s.login(sender_email, sender_password)

        s.sendmail(sender_email, receiver_email, msg.as_string())
        print("Email sent successfully!")

    except Exception as e:
        print("Error:", e)

    finally:
        s.quit()
    return messages


def openai_text(ROLE_PROMPT, INSTRUCTION_PROMPT, QUESTION):
  client = OpenAI(api_key="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")
  assistant = client.beta.assistants.create(
    name = ROLE_PROMPT,
    instructions = INSTRUCTION_PROMPT,
    tools=[{"type": "code_interpreter"}],
    model="gpt-4-1106-preview"
  )
  thread = client.beta.threads.create()
  message = client.beta.threads.messages.create(
    thread_id=thread.id,
    # file_ids = [file_id],
    role="user",
    content=QUESTION
  )
  run = client.beta.threads.runs.create(
    thread_id = thread.id,
    assistant_id = assistant.id
  )
  run_thread(client, thread, run)
  messages = client.beta.threads.messages.list(thread_id=thread.id)
  while True:
    messages = client.beta.threads.messages.list(thread_id=thread.id)
    if has_assistant_responded(messages):
      break
    time.sleep(1)
  return_messages = ""
  for message in reversed(messages.data):
      return_messages += message.role+":"+message.content[0].text.value+"\n"
  return return_messages

def run_thread(client, thread, run):
  run = client.beta.threads.runs.retrieve(
    thread_id = thread.id,
    run_id = run.id
  )
  messages = client.beta.threads.messages.list(
    thread_id = thread.id
  )
  for message in reversed(messages.data):
    print(message.role+":"+message.content[0].text.value)

def has_assistant_responded(messages):
    print("check")
    for m in reversed(messages.data):
        if m.role == "assistant" and m.content[0].text.value != "":
            print("assist: "+m.content[0].text.value)
            return True
    return False
# openai_text(, "Can you help me?")

if __name__ == '__main__':
    app.run()



