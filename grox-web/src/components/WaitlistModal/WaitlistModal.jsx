import React, { useState, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import Button from '../Button/Button';
import PhoneInput from './PhoneInput/PhoneInput';
import './WaitlistModal.scss';
import GroxLogo from './grox-logo.svg';
import WaitlistBg from './waitlist-bg.svg';
import Send from './Send.svg';

const WaitlistModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
      });
      setErrors({});
      setShowFeedback(false);
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country of residence is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit(formData);
      setShowFeedback(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='waitlist-modal__backdrop'
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby='waitlist-modal-title'
    >
      <div className='waitlist-modal'>
        <div className='waitlist-modal__sides'>
          {/* Side 1: Gradient Background with Content */}
          <div className='waitlist-modal__side waitlist-modal__side--left'>
            <div className='waitlist-modal__gradient-bg'>
              <img
                src={WaitlistBg}
                alt=''
                className='waitlist-modal__bg-image'
              />
            </div>
            <div className='waitlist-modal__content-holder'>
              <img
                src={GroxLogo}
                alt='Grox Logo'
                className='waitlist-modal__logo'
              />
              <div className='waitlist-modal__text-holder'>
                <h5 className='waitlist-modal__subtitle'>
                  Look who we have here!
                </h5>
                <h3 className='waitlist-modal__title-text'>
                  Glad to see you join the movement
                </h3>
              </div>
              <div className='waitlist-modal__placeholder'>
                <span style={{ opacity: 0 }}>Placeholder for alignment</span>
              </div>
            </div>
          </div>

          {/* Side 2: Form or Feedback Content */}
          <div className='waitlist-modal__side waitlist-modal__side--right'>
            {!showFeedback ? (
              // Form Content
              <>
                <div className='waitlist-modal__header'>
                  <h2
                    id='waitlist-modal-title'
                    className='waitlist-modal__title'
                  >
                    Join the Waitlist
                  </h2>
                  <button
                    className='waitlist-modal__close'
                    onClick={onClose}
                    aria-label='Close modal'
                    tabIndex={0}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className='waitlist-modal__form-container'>
                  <p className='waitlist-modal__description'>
                    Kindly fill your details below and we would be happy to
                    reach out!
                  </p>

                  <form onSubmit={handleSubmit} className='waitlist-form'>
                    <div className='waitlist-form__row'>
                      <div className='waitlist-form__field'>
                        <label
                          htmlFor='firstName'
                          className='waitlist-form__label'
                        >
                          First Name *
                        </label>
                        <input
                          id='firstName'
                          type='text'
                          value={formData.firstName}
                          onChange={e =>
                            handleInputChange('firstName', e.target.value)
                          }
                          className={`waitlist-form__input ${errors.firstName ? 'waitlist-form__input--error' : ''}`}
                          placeholder='Enter your first name'
                          disabled={isLoading}
                          tabIndex={0}
                        />
                        {errors.firstName && (
                          <span className='waitlist-form__error'>
                            {errors.firstName}
                          </span>
                        )}
                      </div>

                      <div className='waitlist-form__field'>
                        <label
                          htmlFor='lastName'
                          className='waitlist-form__label'
                        >
                          Last Name *
                        </label>
                        <input
                          id='lastName'
                          type='text'
                          value={formData.lastName}
                          onChange={e =>
                            handleInputChange('lastName', e.target.value)
                          }
                          className={`waitlist-form__input ${errors.lastName ? 'waitlist-form__input--error' : ''}`}
                          placeholder='Enter your last name'
                          disabled={isLoading}
                          tabIndex={0}
                        />
                        {errors.lastName && (
                          <span className='waitlist-form__error'>
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='waitlist-form__field'>
                      <label htmlFor='email' className='waitlist-form__label'>
                        Email Address *
                      </label>
                      <input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={e =>
                          handleInputChange('email', e.target.value)
                        }
                        className={`waitlist-form__input ${errors.email ? 'waitlist-form__input--error' : ''}`}
                        placeholder='Enter your email address'
                        disabled={isLoading}
                        tabIndex={0}
                      />
                      {errors.email && (
                        <span className='waitlist-form__error'>
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className='waitlist-form__field'>
                      <label htmlFor='phone' className='waitlist-form__label'>
                        Phone Number *
                      </label>
                      <PhoneInput
                        value={formData.phone}
                        onChange={value => handleInputChange('phone', value)}
                        error={errors.phone}
                        disabled={isLoading}
                      />
                      {errors.phone && (
                        <span className='waitlist-form__error'>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className='waitlist-form__field'>
                      <label htmlFor='country' className='waitlist-form__label'>
                        Country of Residence *
                      </label>
                      <select
                        id='country'
                        value={formData.country}
                        onChange={e =>
                          handleInputChange('country', e.target.value)
                        }
                        className={`waitlist-form__input waitlist-form__select ${errors.country ? 'waitlist-form__input--error' : ''}`}
                        disabled={isLoading}
                        tabIndex={0}
                      >
                        <option value=''>Select your country</option>
                        <option value='afghanistan'>Afghanistan</option>
                        <option value='albania'>Albania</option>
                        <option value='algeria'>Algeria</option>
                        <option value='andorra'>Andorra</option>
                        <option value='angola'>Angola</option>
                        <option value='antigua-and-barbuda'>
                          Antigua and Barbuda
                        </option>
                        <option value='argentina'>Argentina</option>
                        <option value='armenia'>Armenia</option>
                        <option value='australia'>Australia</option>
                        <option value='austria'>Austria</option>
                        <option value='azerbaijan'>Azerbaijan</option>
                        <option value='bahamas'>Bahamas</option>
                        <option value='bahrain'>Bahrain</option>
                        <option value='bangladesh'>Bangladesh</option>
                        <option value='barbados'>Barbados</option>
                        <option value='belarus'>Belarus</option>
                        <option value='belgium'>Belgium</option>
                        <option value='belize'>Belize</option>
                        <option value='benin'>Benin</option>
                        <option value='bhutan'>Bhutan</option>
                        <option value='bolivia'>Bolivia</option>
                        <option value='bosnia-and-herzegovina'>
                          Bosnia and Herzegovina
                        </option>
                        <option value='botswana'>Botswana</option>
                        <option value='brazil'>Brazil</option>
                        <option value='brunei'>Brunei</option>
                        <option value='bulgaria'>Bulgaria</option>
                        <option value='burkina-faso'>Burkina Faso</option>
                        <option value='burundi'>Burundi</option>
                        <option value='cambodia'>Cambodia</option>
                        <option value='cameroon'>Cameroon</option>
                        <option value='canada'>Canada</option>
                        <option value='cape-verde'>Cape Verde</option>
                        <option value='central-african-republic'>
                          Central African Republic
                        </option>
                        <option value='chad'>Chad</option>
                        <option value='chile'>Chile</option>
                        <option value='china'>China</option>
                        <option value='colombia'>Colombia</option>
                        <option value='comoros'>Comoros</option>
                        <option value='congo'>Congo</option>
                        <option value='costa-rica'>Costa Rica</option>
                        <option value='croatia'>Croatia</option>
                        <option value='cuba'>Cuba</option>
                        <option value='cyprus'>Cyprus</option>
                        <option value='czech-republic'>Czech Republic</option>
                        <option value='democratic-republic-of-congo'>
                          Democratic Republic of Congo
                        </option>
                        <option value='denmark'>Denmark</option>
                        <option value='djibouti'>Djibouti</option>
                        <option value='dominica'>Dominica</option>
                        <option value='dominican-republic'>
                          Dominican Republic
                        </option>
                        <option value='ecuador'>Ecuador</option>
                        <option value='egypt'>Egypt</option>
                        <option value='el-salvador'>El Salvador</option>
                        <option value='equatorial-guinea'>
                          Equatorial Guinea
                        </option>
                        <option value='eritrea'>Eritrea</option>
                        <option value='estonia'>Estonia</option>
                        <option value='eswatini'>Eswatini</option>
                        <option value='ethiopia'>Ethiopia</option>
                        <option value='fiji'>Fiji</option>
                        <option value='finland'>Finland</option>
                        <option value='france'>France</option>
                        <option value='gabon'>Gabon</option>
                        <option value='gambia'>Gambia</option>
                        <option value='georgia'>Georgia</option>
                        <option value='germany'>Germany</option>
                        <option value='ghana'>Ghana</option>
                        <option value='greece'>Greece</option>
                        <option value='grenada'>Grenada</option>
                        <option value='guatemala'>Guatemala</option>
                        <option value='guinea'>Guinea</option>
                        <option value='guinea-bissau'>Guinea-Bissau</option>
                        <option value='guyana'>Guyana</option>
                        <option value='haiti'>Haiti</option>
                        <option value='honduras'>Honduras</option>
                        <option value='hungary'>Hungary</option>
                        <option value='iceland'>Iceland</option>
                        <option value='india'>India</option>
                        <option value='indonesia'>Indonesia</option>
                        <option value='iran'>Iran</option>
                        <option value='iraq'>Iraq</option>
                        <option value='ireland'>Ireland</option>
                        <option value='israel'>Israel</option>
                        <option value='italy'>Italy</option>
                        <option value='ivory-coast'>Ivory Coast</option>
                        <option value='jamaica'>Jamaica</option>
                        <option value='japan'>Japan</option>
                        <option value='jordan'>Jordan</option>
                        <option value='kazakhstan'>Kazakhstan</option>
                        <option value='kenya'>Kenya</option>
                        <option value='kiribati'>Kiribati</option>
                        <option value='kuwait'>Kuwait</option>
                        <option value='kyrgyzstan'>Kyrgyzstan</option>
                        <option value='laos'>Laos</option>
                        <option value='latvia'>Latvia</option>
                        <option value='lebanon'>Lebanon</option>
                        <option value='lesotho'>Lesotho</option>
                        <option value='liberia'>Liberia</option>
                        <option value='libya'>Libya</option>
                        <option value='liechtenstein'>Liechtenstein</option>
                        <option value='lithuania'>Lithuania</option>
                        <option value='luxembourg'>Luxembourg</option>
                        <option value='madagascar'>Madagascar</option>
                        <option value='malawi'>Malawi</option>
                        <option value='malaysia'>Malaysia</option>
                        <option value='maldives'>Maldives</option>
                        <option value='mali'>Mali</option>
                        <option value='malta'>Malta</option>
                        <option value='marshall-islands'>
                          Marshall Islands
                        </option>
                        <option value='mauritania'>Mauritania</option>
                        <option value='mauritius'>Mauritius</option>
                        <option value='mexico'>Mexico</option>
                        <option value='micronesia'>Micronesia</option>
                        <option value='moldova'>Moldova</option>
                        <option value='monaco'>Monaco</option>
                        <option value='mongolia'>Mongolia</option>
                        <option value='montenegro'>Montenegro</option>
                        <option value='morocco'>Morocco</option>
                        <option value='mozambique'>Mozambique</option>
                        <option value='myanmar'>Myanmar</option>
                        <option value='namibia'>Namibia</option>
                        <option value='nauru'>Nauru</option>
                        <option value='nepal'>Nepal</option>
                        <option value='netherlands'>Netherlands</option>
                        <option value='new-zealand'>New Zealand</option>
                        <option value='nicaragua'>Nicaragua</option>
                        <option value='niger'>Niger</option>
                        <option value='nigeria'>Nigeria</option>
                        <option value='north-macedonia'>North Macedonia</option>
                        <option value='norway'>Norway</option>
                        <option value='oman'>Oman</option>
                        <option value='pakistan'>Pakistan</option>
                        <option value='palau'>Palau</option>
                        <option value='panama'>Panama</option>
                        <option value='papua-new-guinea'>
                          Papua New Guinea
                        </option>
                        <option value='paraguay'>Paraguay</option>
                        <option value='peru'>Peru</option>
                        <option value='philippines'>Philippines</option>
                        <option value='poland'>Poland</option>
                        <option value='portugal'>Portugal</option>
                        <option value='qatar'>Qatar</option>
                        <option value='romania'>Romania</option>
                        <option value='russia'>Russia</option>
                        <option value='rwanda'>Rwanda</option>
                        <option value='saint-kitts-and-nevis'>
                          Saint Kitts and Nevis
                        </option>
                        <option value='saint-lucia'>Saint Lucia</option>
                        <option value='saint-vincent-and-the-grenadines'>
                          Saint Vincent and the Grenadines
                        </option>
                        <option value='samoa'>Samoa</option>
                        <option value='san-marino'>San Marino</option>
                        <option value='sao-tome-and-principe'>
                          São Tomé and Príncipe
                        </option>
                        <option value='saudi-arabia'>Saudi Arabia</option>
                        <option value='senegal'>Senegal</option>
                        <option value='serbia'>Serbia</option>
                        <option value='seychelles'>Seychelles</option>
                        <option value='sierra-leone'>Sierra Leone</option>
                        <option value='singapore'>Singapore</option>
                        <option value='slovakia'>Slovakia</option>
                        <option value='slovenia'>Slovenia</option>
                        <option value='solomon-islands'>Solomon Islands</option>
                        <option value='somalia'>Somalia</option>
                        <option value='south-africa'>South Africa</option>
                        <option value='south-sudan'>South Sudan</option>
                        <option value='spain'>Spain</option>
                        <option value='sri-lanka'>Sri Lanka</option>
                        <option value='sudan'>Sudan</option>
                        <option value='suriname'>Suriname</option>
                        <option value='sweden'>Sweden</option>
                        <option value='switzerland'>Switzerland</option>
                        <option value='syria'>Syria</option>
                        <option value='taiwan'>Taiwan</option>
                        <option value='tajikistan'>Tajikistan</option>
                        <option value='tanzania'>Tanzania</option>
                        <option value='thailand'>Thailand</option>
                        <option value='timor-leste'>Timor-Leste</option>
                        <option value='togo'>Togo</option>
                        <option value='tonga'>Tonga</option>
                        <option value='trinidad-and-tobago'>
                          Trinidad and Tobago
                        </option>
                        <option value='tunisia'>Tunisia</option>
                        <option value='turkey'>Turkey</option>
                        <option value='turkmenistan'>Turkmenistan</option>
                        <option value='tuvalu'>Tuvalu</option>
                        <option value='uganda'>Uganda</option>
                        <option value='ukraine'>Ukraine</option>
                        <option value='united-arab-emirates'>
                          United Arab Emirates
                        </option>
                        <option value='united-kingdom'>United Kingdom</option>
                        <option value='united-states'>United States</option>
                        <option value='uruguay'>Uruguay</option>
                        <option value='uzbekistan'>Uzbekistan</option>
                        <option value='vanuatu'>Vanuatu</option>
                        <option value='venezuela'>Venezuela</option>
                        <option value='vietnam'>Vietnam</option>
                        <option value='yemen'>Yemen</option>
                        <option value='zambia'>Zambia</option>
                        <option value='zimbabwe'>Zimbabwe</option>
                      </select>
                      {errors.country && (
                        <span className='waitlist-form__error'>
                          {errors.country}
                        </span>
                      )}
                    </div>

                    <div className='waitlist-form__actions'>
                      <Button
                        type='submit'
                        variant='primary'
                        size='lg'
                        loading={isLoading}
                        disabled={isLoading}
                        className='waitlist-form__submit'
                      >
                        {isLoading ? 'Joining Waitlist...' : 'Join Waitlist'}
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              // Feedback Content
              <>
                <div className='waitlist-modal__header'>
                  <button
                    className='waitlist-modal__close'
                    onClick={onClose}
                    aria-label='Close modal'
                    tabIndex={0}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className='waitlist-modal__feedback-container'>
                  <div className='waitlist-modal__feedback-content'>
                    {/* Send Icon */}
                    <div className='waitlist-modal__feedback-icon'>
                      <img src={Send} alt='Send' />
                    </div>

                    {/* Text Content */}
                    <div className='waitlist-modal__feedback-text'>
                      <h3 className='waitlist-modal__feedback-title'>
                        You're now on the waitlist
                      </h3>
                      <p className='waitlist-modal__feedback-description'>
                        Don't miss us! We would reach out soon. 😉
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
