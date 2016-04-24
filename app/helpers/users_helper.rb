module UsersHelper

  # Returns the Gravatar for the given user.
  def gravatar_for(account)
    gravatar_id = Digest::MD5::hexdigest(account.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    image_tag(gravatar_url, alt: account.name, class: "gravatar")
  end
end
