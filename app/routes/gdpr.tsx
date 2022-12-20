export default function Gdpr() {
  return (
    <div className="p-10 flex flex-col items-center">
      <div className="prose pb-10">
        <h1>Privacy policy</h1>
        At nonscordamai, we are committed to protecting the privacy and security of our users. We have implemented the necessary measures to comply with the General Data Protection Regulation (GDPR).
        When you sign up for our service using your Google or Github account with oauth, we collect certain personal data, such as your name and email address. This data is used to create your account and provide you with access to our service.
        We use a third-party service, Supabase, to store the entries (text + location) that you add on our website. This data is not encrypted at rest.
        Please note that during the development phase of our website, we do not have a process in place to handle requests from users to exercise their rights under the GDPR. If you have any questions or concerns about your personal data, or if you wish to exercise any of your rights, please contact us at <a href="mailto:charly.gomez1310@gmail.com">charly.gomez1310@gmail.com</a>.
        <h4>All the images used on this app (like the wine drinking orangutan wearing a suit below) were created by <a href="https://openai.com/dall-e-2">DALL·E 2</a></h4>
        <img
          src="/images/orangu.webp"
          alt="Wine drinking orangutan"
        />
      </div>
    </div>
  );
}