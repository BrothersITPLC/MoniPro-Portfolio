
export default function TelegramLoginButton() {
  return (
    <div>
      <script
        async
        src="https://telegram.org/js/telegram-widget.js?15"
        data-telegram-login="YourBotUsername"
        data-size="large"
        data-userpic="false"
        data-auth-url="https://monipro.brothersit.dev/api/telegram/"
      ></script>
    </div>
  );
}
