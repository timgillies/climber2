module UsersHelper

  # Returns the Gravatar for the given user.
  def gravatar_for(user, options = { size: 125})
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    image_tag(gravatar_url, alt: user.name, class: "gravatar")
  end

  def gravatar_url(user, size)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  end

  def photo_for_profile(user, photo_size)
    if user.image?
      image_tag user.image + "?type=large", class: "img-profile"
    elsif user.avatar?
      image_tag user.avatar.url(:thumb), class: "img-profile"
    else
      image_tag gravatar_url(user, photo_size), class: "img-profile"
    end
  end

  def roles
    [
      ['Climber', 'user'],
      ['Facility Admin', 'facility_admin']
    ]
  end

  def genders
    [
      ['Male', 'male'],
      ['Female', 'female']
    ]
  end

end
