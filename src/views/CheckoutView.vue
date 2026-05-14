<template>
  <div class="checkout-page">
    <div class="bg-pattern"></div>

    <header class="checkout-header">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <span class="logo-qurban">ILM</span><span class="logo-hub">Qurban</span>
        </router-link>
        <div class="header-steps">
          <div class="step" :class="{ active: currentStep >= 1, done: currentStep > 1 }">
            <div class="step-num">{{ currentStep > 1 ? '✓' : '1' }}</div>
            <span>Order Details</span>
          </div>
          <div class="step-line" :class="{ done: currentStep > 1 }"></div>
          <div class="step" :class="{ active: currentStep >= 2 }">
            <div class="step-num">2</div>
            <span>Payment</span>
          </div>
        </div>
      </div>
    </header>

    <main class="checkout-main">
      <div class="checkout-grid">
        <div class="form-column">
          <transition name="slide-fade">
            <div v-if="currentStep === 1" class="form-card" key="step1">
              <div class="section-block">
                <div class="card-header">
                  <div class="card-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <div>
                    <h2>Quantity</h2>
                    <p>How many animals would you like to order?</p>
                  </div>
                </div>
                <div v-if="maxShare > 1" class="purchase-type-selector">
                  <div
                    class="type-option"
                    :class="{ active: purchaseType === 'full' }"
                    @click="purchaseType = 'full'"
                  >
                    <div class="option-check"></div>
                    <div class="option-info">
                      <div class="option-title">Full Animal</div>
                      <div class="option-desc">Order the entire animal ({{ maxShare }} shares)</div>
                    </div>
                  </div>
                  <div
                    class="type-option"
                    :class="{ active: purchaseType === 'share' }"
                    @click="purchaseType = 'share'"
                  >
                    <div class="option-check"></div>
                    <div class="option-info">
                      <div class="option-title">Per Part</div>
                      <div class="option-desc">Order a portion of the animal (1 part)</div>
                    </div>
                  </div>
                </div>

                <div class="quantity-wrapper">
                  <div class="quantity-product-preview">
                    <div class="qty-product-name">
                      {{ productName }} {{ isPerShare ? '(Per Share)' : '(Full Animal)' }}
                    </div>
                    <div class="qty-product-price">
                      {{ formatPrice(currentUnitPrice) }} / {{ isPerShare ? 'share' : 'animal' }}
                    </div>
                  </div>
                  <div class="quantity-control">
                    <button class="qty-btn" @click="decreaseQty" :disabled="quantity <= 1 || isPerShare">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <div class="qty-display">
                      <span class="qty-number">{{ quantity }}</span>
                      <span class="qty-label"
                        >{{ isPerShare ? 'share' : 'animal' }}{{ quantity > 1 ? 's' : '' }}</span
                      >
                    </div>
                    <button class="qty-btn" @click="increaseQty" :disabled="quantity >= 10 || isPerShare">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <div class="qty-total-row">
                    <span class="qty-total-label">Subtotal</span>
                    <span class="qty-total-amount">{{ formatPrice(totalPrice) }}</span>
                  </div>
                </div>
              </div>

              <div class="section-divider">
                <div class="divider-line"></div>
                <div class="divider-label">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  Buyer Information
                </div>
                <div class="divider-line"></div>
              </div>

              <div class="section-block">
                <div class="form-grid">
                  <div class="field">
                    <label>First Name <span class="req">*</span></label>
                    <input
                      v-model="buyer.firstName"
                      type="text"
                      placeholder="Enter first name"
                      :class="{ error: errors.firstName }"
                    />
                    <span class="err-msg" v-if="errors.firstName">{{ errors.firstName }}</span>
                  </div>
                  <div class="field">
                    <label>Last Name <span class="req">*</span></label>
                    <input
                      v-model="buyer.lastName"
                      type="text"
                      placeholder="Enter last name"
                      :class="{ error: errors.lastName }"
                    />
                    <span class="err-msg" v-if="errors.lastName">{{ errors.lastName }}</span>
                  </div>
                  <div class="field">
                    <label>Email <span class="req">*</span></label>
                    <input
                      v-model="buyer.email"
                      type="email"
                      placeholder="email@example.com"
                      :class="{ error: errors.email }"
                    />
                    <span class="err-msg" v-if="errors.email">{{ errors.email }}</span>
                  </div>
                  <div class="field">
                    <label>Phone Number <span class="req">*</span></label>
                    <div
                      class="phone-input-wrapper"
                      :class="{ 'phone-input-error': errors.phone }"
                    >
                      <div
                        class="phone-dial-selector"
                        @click="isPhoneDropdownOpen = !isPhoneDropdownOpen"
                        ref="phoneDropdownRef"
                      >
                        <img
                          v-if="selectedDialCode?.flags?.png"
                          :src="selectedDialCode.flags.png"
                          class="flag-icon"
                        />
                        <span class="dial-code-text">{{ selectedDialCode?.iddFull }}</span>
                        <span class="chevron">▼</span>
                        <div
                          v-if="isPhoneDropdownOpen"
                          class="dropdown-list phone-dropdown"
                          @click.stop
                        >
                          <input
                            v-model="dialSearch"
                            type="text"
                            class="search-input"
                            placeholder="Search country..."
                            @click.stop
                          />
                          <div class="options-container">
                            <div
                              v-for="c in filteredDialCountries"
                              :key="c.cca2"
                              class="option-item"
                              @click.stop="selectDialCode(c)"
                            >
                              <img :src="c.flags.png" class="flag-icon" />
                              <span>{{ c.name.common }}</span>
                              <span class="dial-badge">{{ c.iddFull }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        v-model="buyer.phoneLocal"
                        type="tel"
                        class="phone-number-input"
                        placeholder="8802 0744"
                      />
                    </div>
                    <span class="err-msg" v-if="errors.phone">{{ errors.phone }}</span>
                  </div>

                  <div class="field country-field">
                    <label>Country <span class="req">*</span></label>
                    <div class="custom-select-container" ref="countryDropdown">
                      <div
                        class="selected-country"
                        @click="isDropdownOpen = !isDropdownOpen"
                        :class="{ error: errors.country }"
                      >
                        <template v-if="selectedCountryData">
                          <img :src="selectedCountryData.flags.png" class="flag-icon" />
                          <span>{{ selectedCountryData.name.common }}</span>
                        </template>
                        <span v-else class="placeholder">Select Country</span>
                        <span class="chevron">▼</span>
                      </div>
                      <div v-if="isDropdownOpen" class="dropdown-list">
                        <input
                          v-model="countrySearch"
                          type="text"
                          class="search-input"
                          placeholder="Search country..."
                          @click.stop
                        />
                        <div class="options-container">
                          <div
                            v-for="c in filteredCountries"
                            :key="c.cca2"
                            class="option-item"
                            @click="selectCountry(c)"
                          >
                            <img :src="c.flags.png" class="flag-icon" />
                            <span>{{ c.name.common }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span class="err-msg" v-if="errors.country">{{ errors.country }}</span>
                  </div>
                  <div class="field">
                    <label>Notes <span class="opt">(optional)</span></label>
                    <input v-model="buyer.notes" type="text" placeholder="Additional notes..." />
                  </div>
                </div>
              </div>

              <div class="section-divider">
                <div class="divider-line"></div>
                <div class="divider-label">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Qurban Recipients
                </div>
                <div class="divider-line"></div>
              </div>

              <div class="section-block">
                <div class="recipients-intro">
                  <p>Enter the name(s) on whose behalf the qurban will be performed</p>
                  <!-- <span class="quota-badge"
                    >Max. {{ totalRecipients }} recipient{{ totalShares > 1 ? 's' : '' }}</span
                  > -->
                </div>

                <div class="recipients-list-container">
                  <div
                    v-for="(recipient, index) in allRecipients"
                    :key="index"
                    class="recipient-block"
                  >
                    <div class="recipient-label">
                      <!-- <div class="recipient-num">{{ index + 1 }}</div> -->
                      <!-- <span>Recipient {{ index + 1 }}</span> -->
                      <span class="recipient-animal-tag" v-if="quantity > 1">
                        Animal {{ Math.ceil((index + 1) / maxShare) }}
                      </span>
                    </div>
                    <div class="form-grid">
                      <div class="field full">
                        <label>Full Name <span class="req">*</span></label>
                        <input
                          v-model="recipient.name"
                          type="text"
                          :placeholder="`Recipient ${index + 1} name`"
                          :class="{ error: allRecipientErrors[index]?.name }"
                        />
                        <span class="err-msg" v-if="allRecipientErrors[index]?.name">{{
                          allRecipientErrors[index].name
                        }}</span>
                      </div>
                      <div class="field">
                        <label>Email <span class="req">*</span></label>
                        <input
                          v-model="recipient.email"
                          type="email"
                          placeholder="email@example.com"
                          :class="{ error: allRecipientErrors[index]?.email }"
                        />
                        <span class="err-msg" v-if="allRecipientErrors[index]?.email">{{
                          allRecipientErrors[index].email
                        }}</span>
                      </div>
                      <div class="field">
                        <label>Phone Number <span class="req">*</span></label>
                        <input
                          v-model="recipient.phone"
                          type="tel"
                          placeholder="enter your mobile number"
                          :class="{ error: allRecipientErrors[index]?.phone }"
                        />
                        <span class="err-msg" v-if="allRecipientErrors[index]?.phone">{{
                          allRecipientErrors[index].phone
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button class="btn-next" @click="goToStep2">
                Continue to Payment
                <span class="arrow">&#8594;</span>
              </button>
            </div>
          </transition>

          <transition name="slide-fade">
            <div v-if="currentStep === 2" class="form-card" key="step2">
              <div class="card-header">
                <div class="card-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h2>Payment Method</h2>
                  <p>Select your preferred payment method</p>
                </div>
              </div>

              <div class="payment-tabs">
                <button
                  class="pay-tab"
                  :class="{ active: paymentMethod === 'card' }"
                  @click="paymentMethod = 'card'"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  Credit / Debit Card
                </button>
                <button
                  class="pay-tab"
                  :class="{ active: paymentMethod === 'transfer' }"
                  @click="paymentMethod = 'transfer'"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                  Bank Transfer
                </button>
              </div>
              <div v-if="paymentMethod === 'card'">
                <div class="card-brands">
                  <div class="brand-badge">
                    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
                      <rect width="38" height="24" rx="4" fill="#1A1F71" />
                      <rect x="14" y="6" width="10" height="12" fill="#FF5F00" />
                      <circle cx="10" cy="12" r="6" fill="#EB001B" />
                      <circle cx="28" cy="12" r="6" fill="#F79E1B" />
                    </svg>
                    <span>Mastercard</span>
                  </div>
                  <div class="brand-badge">
                    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
                      <rect width="38" height="24" rx="4" fill="#1A1F71" />
                      <text
                        x="5"
                        y="17"
                        font-family="Arial"
                        font-weight="bold"
                        font-size="12"
                        fill="white"
                      >
                        VISA
                      </text>
                    </svg>
                    <span>Visa</span>
                  </div>
                  <div class="secure-badge">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    SSL Encrypted
                  </div>
                </div>

                <div class="stripe-form">
                  <div class="stripe-field-group">
                    <label class="stripe-label">Card Number</label>
                    <div
                      id="card-number-element"
                      class="stripe-input"
                      :class="{
                        'stripe-error': stripeErrors.cardNumber,
                        'stripe-focus': focusedField === 'number',
                      }"
                    ></div>
                    <span class="stripe-err-msg" v-if="stripeErrors.cardNumber">{{
                      stripeErrors.cardNumber
                    }}</span>
                  </div>
                  <div class="stripe-row">
                    <div class="stripe-field-group">
                      <label class="stripe-label">Expiry Date</label>
                      <div
                        id="card-expiry-element"
                        class="stripe-input"
                        :class="{
                          'stripe-error': stripeErrors.cardExpiry,
                          'stripe-focus': focusedField === 'expiry',
                        }"
                      ></div>
                      <span class="stripe-err-msg" v-if="stripeErrors.cardExpiry">{{
                        stripeErrors.cardExpiry
                      }}</span>
                    </div>
                    <div class="stripe-field-group">
                      <label class="stripe-label">CVC Code</label>
                      <div
                        id="card-cvc-element"
                        class="stripe-input"
                        :class="{
                          'stripe-error': stripeErrors.cardCvc,
                          'stripe-focus': focusedField === 'cvc',
                        }"
                      ></div>
                      <span class="stripe-err-msg" v-if="stripeErrors.cardCvc">{{
                        stripeErrors.cardCvc
                      }}</span>
                    </div>
                  </div>
                  <div class="stripe-field-group">
                    <label class="stripe-label">Cardholder Name</label>
                    <input
                      v-model="cardholderName"
                      type="text"
                      class="stripe-input stripe-text-input"
                      placeholder="As shown on card"
                      :class="{ 'stripe-error': stripeErrors.cardholderName }"
                    />
                    <span class="stripe-err-msg" v-if="stripeErrors.cardholderName">{{
                      stripeErrors.cardholderName
                    }}</span>
                  </div>
                  <div v-if="stripeErrors.general" class="stripe-general-error">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {{ stripeErrors.general }}
                  </div>
                </div>
              </div>
              <div v-if="paymentMethod === 'transfer'" class="bank-transfer-section">
                <p class="transfer-intro">
                  Transfer to one of the following bank accounts. Send payment confirmation via
                  WhatsApp after transferring.
                </p>

                <!-- <div class="bank-list">
                  <div
                    v-for="bank in bankList"
                    :key="bank.id"
                    class="bank-item"
                    :class="{ selected: selectedBank === bank.id }"
                    @click="selectedBank = bank.id"
                  >
                    <div class="bank-radio">
                      <div class="radio-dot" :class="{ active: selectedBank === bank.id }"></div>
                    </div>
                    <div class="bank-logo" :style="{ background: bank.color }">
                      {{ bank.abbr }}
                    </div>
                    <div class="bank-info">
                      <div class="bank-name">{{ bank.name }}</div>
                      <div class="bank-account-row">
                        <span class="bank-account-num">{{ bank.accountNumber }}</span>
                        <button
                          class="copy-btn"
                          @click.stop="copyToClipboard(bank.accountNumber, bank.id)"
                          :class="{ copied: copiedBank === bank.id }"
                        >
                          <svg
                            v-if="copiedBank !== bank.id"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <svg
                            v-else
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {{ copiedBank === bank.id ? 'Copied!' : 'Copy' }}
                        </button>
                      </div>
                      <div class="bank-holder">a/n {{ bank.accountHolder }}</div>
                    </div>
                  </div>
                </div> -->

                <div class="payment-method-wrapper">
                  <div class="payment-info-box">
                    <div class="info-item">
                      <i class="ti ti-credit-card info-icon text-warning"></i>
                      <p>
                        Manual payment via Paynow to UEN:
                        <strong>53439168X</strong>
                        (ILMHUB by Shameem Sultanah)
                      </p>
                    </div>

                    <div class="info-item">
                      <i class="ti ti-brand-whatsapp info-icon text-warning"></i>
                      <p>
                        Whatsapp the payment screenshot to
                        <strong>88020744</strong>
                        for us to verify your payment. Please include your
                        ticket/order number as well.
                      </p>
                    </div>

                    <div class="info-item">
                      <i class="ti ti-check info-icon text-warning"></i>
                      <p>
                        Do click on the <strong>'Place Order'</strong>
                        button below to submit your registration*
                      </p>
                    </div>

                    <div class="info-item">
                      <i class="ti ti-check info-icon text-success"></i>
                      <p>Thank you.</p>
                    </div>
                  </div>

                </div>
                <div
                  v-if="transferErrors.bank"
                  class="stripe-general-error"
                  style="margin-top: 16px"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {{ transferErrors.bank }}
                </div>

                <div class="transfer-note">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c9a227"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="flex-shrink: 0"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div>
                    <strong>Important:</strong> Please transfer the exact amount of
                    <strong>{{ formatPrice(totalPrice) }}</strong> and confirm via WhatsApp within
                    24 hours. Your order will be processed after payment verification.
                  </div>
                </div>
              </div>

              <div class="terms-box">
                <label class="terms-check">
                  <input type="checkbox" v-model="agreedToTerms" />
                  <span
                    >I agree to the <a href="#" @click.prevent>Terms &amp; Conditions</a> and
                    <a href="#" @click.prevent>Privacy Policy</a> of QurbanHub</span
                  >
                </label>
              </div>

              <div class="btn-row">
                <button class="btn-back" @click="currentStep = 1">&#8592; Back</button>
                <button
                  class="btn-pay"
                  @click="handlePayment"
                  :disabled="
                    !agreedToTerms || isProcessing || (paymentMethod === 'card' && !stripeReady)
                  "
                >
                  <span v-if="isProcessing" class="spinner"></span>
                  <span v-else-if="paymentMethod === 'card' && !stripeReady" class="loading-stripe"
                    >Loading...</span
                  >
                  <span v-else-if="paymentMethod === 'transfer'">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="display: inline; vertical-align: middle; margin-right: 6px"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                    Confirm Transfer &middot; {{ formatPrice(totalPrice) }}
                  </span>
                  <span v-else>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="display: inline; vertical-align: middle; margin-right: 6px"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Pay Now &middot; {{ formatPrice(totalPrice) }}
                  </span>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <div class="summary-column">
          <div class="summary-card">
            <div class="summary-header">
              <span class="halal-badge">Halal &amp; Sharia Compliant</span>
              <h3>Order Summary</h3>
            </div>
            <div class="product-hero">
              <div class="animal-icon-wrap">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8c84a"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 17c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5v1H3v-1z" />
                  <ellipse cx="12" cy="9" rx="4" ry="3" />
                  <path d="M8 12c-1.5-1-3-1-4 0M16 12c1.5-1 3-1 4 0" />
                  <path d="M9 9c0-1.5-.5-3-2-3M15 9c0-1.5 .5-3 2-3" />
                </svg>
              </div>
              <div class="product-info">
                <div class="product-name">{{ productName }}</div>
                <div class="purchase-type-badge" v-if="maxShare > 1">
                  {{ isPerShare ? 'Per Share' : 'Full Animal' }}
                </div>
                <div class="product-desc">{{ description }}</div>
                <div class="product-share">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8c84a"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="flex-shrink: 0"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Max. {{ maxShare }} person{{ maxShare > 1 ? 's' : '' }} per animal
                </div>
              </div>
            </div>
            <div class="price-breakdown">
              <div class="price-row">
                <span>Unit price</span><span>{{ formatPrice(currentUnitPrice) }}</span>
              </div>
              <div class="price-row quantity-row">
                <span>Quantity</span>
                <div class="inline-qty-ctrl">
                  <button class="inline-qty-btn" @click="decreaseQty" :disabled="quantity <= 1 || isPerShare">
                    −
                  </button>
                  <span class="inline-qty-num">{{ quantity }}</span>
                  <button class="inline-qty-btn" @click="increaseQty" :disabled="quantity >= 10 || isPerShare">
                    +
                  </button>
                </div>
              </div>
              <!-- <div class="price-row"><span>Admin fee</span><span class="free">Free</span></div>
              <div class="price-row">
                <span>Distribution fee</span><span class="free">Free</span>
              </div> -->
              <div class="price-divider"></div>
              <div class="price-row total">
                <span>Total Payment</span>
                <span class="total-amount">{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>

            <div class="trust-items">
              <div class="trust-item" v-for="t in trustList" :key="t">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6bcb77"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style="flex-shrink: 0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{{ t }}</span>
              </div>
            </div>
            <div class="contact-help">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e8c84a"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="flex-shrink: 0"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <div>
                <strong>Need help?</strong>
                <p>
                  Phone:
                  <span>+65 60444555</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Modal -->
    <transition name="modal-fade">
      <div v-if="showSuccess" class="modal-overlay" @click.self="showSuccess = false">
        <div class="modal-box">
          <div class="modal-icon-wrap">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7a1c2e"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3>Order Successful!</h3>
          <p v-if="paymentMethod === 'transfer'">
            Your qurban order has been registered. Please complete the bank transfer and confirm via
            WhatsApp.
          </p>
          <p v-else>
            Thank you for placing your qurban order through QurbanHub. We will process your order
            shortly.
          </p>
          <div class="modal-order">
            <span>Order No.:</span>
            <strong>#QH{{ orderNumber }}</strong>
          </div>
          <div v-if="paymentMethod === 'transfer'" class="modal-transfer-info">
            <div class="modal-transfer-row">
              <span>Transfer to</span>
              <strong>Shameem Sultanah</strong>
            </div>
            <div class="modal-transfer-row">
              <span>Account No.</span>
              <strong>53439168X</strong>
            </div>
            <div class="modal-transfer-row">
              <span>Amount</span>
              <strong class="transfer-amount-highlight">{{ formatPrice(totalPrice) }}</strong>
            </div>
          </div>
          <p class="modal-note">
            Confirmation sent to <strong>{{ buyer.email }}</strong>
          </p>
          <router-link to="/" class="btn-home">Back to Home</router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const route = useRoute()
const SECRET_KEY = 'qurbanhub2026'

function xorCipher(str, key) {
  return str
    .split('')
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join('')
}

function decodeParams(encoded) {
  try {
    const xored = atob(encoded)
    const jsonStr = xorCipher(xored, SECRET_KEY)
    return JSON.parse(jsonStr)
  } catch {
    return null
  }
}

const parsedParams = computed(() => {
  if (!route.query.d) {
    return {
      id: 1,
      name: 'Kambing Qurban',
      price: 2800000,
      share: 1,
      desc: '',
    }
  }

  const decoded = decodeParams(route.query.d)

  return {
    id: decoded?.id || 1,
    name: decoded?.name || 'Kambing Qurban',
    price: decoded?.price || 2800000,
    share: decoded?.share || 1,
    desc: decoded?.desc || '',
  }
})
const productId = computed(() => parsedParams.value.id)
const productName = computed(() => parsedParams.value.name)
const productPrice = computed(() => parsedParams.value.price)
const maxShare = computed(() => parsedParams.value.share)
const description = computed(() => parsedParams.value.desc)

const purchaseType = ref('full')
const isPerShare = computed(() => purchaseType.value === 'share' && maxShare.value > 1)
const currentUnitPrice = computed(() => {
  return isPerShare.value ? productPrice.value / maxShare.value : productPrice.value
})

const quantity = ref(1)

function increaseQty() {
  if (quantity.value < 10) quantity.value++
}
function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}
const totalPrice = computed(() => currentUnitPrice.value * quantity.value)
const totalRecipients = computed(() => {
  return isPerShare.value ? quantity.value : maxShare.value * quantity.value
})

const currentStep = ref(1)
const buyer = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',      
  phoneLocal: '',   
  country: '',
  countryCode: '',
  notes: '',
})
const errors = ref({})

const countries = ref([])
const countrySearch = ref('')
const isDropdownOpen = ref(false)
const selectedCountryData = ref(null)
const countryDropdown = ref(null)


const isPhoneDropdownOpen = ref(false)
const dialSearch = ref('')
const phoneDropdownRef = ref(null)
const selectedDialCode = ref(null)

const dialCountries = computed(() =>
  countries.value
    .map((c) => {
      const root = c.idd?.root || ''
      const suffix = c.idd?.suffixes?.length === 1 ? c.idd.suffixes[0] : ''
      const iddFull = root + suffix
      return { ...c, iddFull }
    })
    .filter((c) => c.iddFull && c.iddFull !== '')
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
)

const filteredDialCountries = computed(() => {
  if (!dialSearch.value) return dialCountries.value
  const q = dialSearch.value.toLowerCase()
  return dialCountries.value.filter(
    (c) => c.name.common.toLowerCase().includes(q) || c.iddFull.includes(dialSearch.value),
  )
})

function selectDialCode(c) {
  selectedDialCode.value = c
  isPhoneDropdownOpen.value = false
  dialSearch.value = ''
}

watch(purchaseType, (val) => {
  if (val === 'share') quantity.value = 1
})

watch([() => buyer.value.phoneLocal, selectedDialCode], () => {
  const local = buyer.value.phoneLocal.trim()
  const code = selectedDialCode.value?.iddFull || ''
  if (code && local) {
    const normalized = local.startsWith('0') ? local.slice(1) : local
    buyer.value.phone = code + normalized
  } else if (local) {
    buyer.value.phone = local
  } else {
    buyer.value.phone = ''
  }
})


onMounted(async () => {
  if (totalRecipients.value) rebuildRecipients(totalRecipients.value)

  // Fetch Countries
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd')
    countries.value = data.sort((a, b) => a.name.common.localeCompare(b.name.common))

    const sg = countries.value.find((c) => c.cca2 === 'SG')
    if (sg) selectCountry(sg)

    const sgDial = countries.value.find((c) => c.cca2 === 'SG')
    if (sgDial) {
      const root = sgDial.idd?.root || ''
      const suffix = sgDial.idd?.suffixes?.length === 1 ? sgDial.idd.suffixes[0] : ''
      selectedDialCode.value = { ...sgDial, iddFull: root + suffix }
    }
  } catch (err) {
    console.error('Failed to fetch countries', err)
  }

  window.addEventListener('click', (e) => {
    if (countryDropdown.value && !countryDropdown.value.contains(e.target)) {
      isDropdownOpen.value = false
    }
    if (phoneDropdownRef.value && !phoneDropdownRef.value.contains(e.target)) {
      isPhoneDropdownOpen.value = false
    }
  })
})

const filteredCountries = computed(() => {
  if (!countrySearch.value) return countries.value
  return countries.value.filter((c) =>
    c.name.common.toLowerCase().includes(countrySearch.value.toLowerCase()),
  )
})

function selectCountry(c) {
  selectedCountryData.value = c
  buyer.value.country = c.name.common
  buyer.value.countryCode = c.cca2
  isDropdownOpen.value = false
  countrySearch.value = ''
  if (errors.value.country) errors.value.country = ''
}

function validateBuyer() {
  const e = {}
  if (!buyer.value.firstName.trim()) e.firstName = 'First name is required'
  if (!buyer.value.lastName.trim()) e.lastName = 'Last name is required'
  if (!buyer.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.value.email))
    e.email = 'Invalid email address'
  if (!buyer.value.phoneLocal.trim() || buyer.value.phoneLocal.replace(/\D/g, '').length < 5)
    e.phone = 'Please enter a valid phone number'
  if (!buyer.value.country.trim()) e.country = 'Country is required'
  errors.value = e
  return Object.keys(e).length === 0
}
const allRecipients = ref([])
const allRecipientErrors = ref([])

function rebuildRecipients(count) {
  const current = allRecipients.value.slice()
  allRecipients.value = Array.from(
    { length: count },
    (_, i) => current[i] || { name: '', email: '', phone: '' },
  )
  allRecipientErrors.value = Array.from({ length: count }, () => ({}))
}

onMounted(() => rebuildRecipients(totalRecipients.value))
watch(totalRecipients, (n) => rebuildRecipients(n))

function validateRecipients() {
  let valid = true
  allRecipientErrors.value = allRecipients.value.map((r) => {
    const e = {}
    if (!r.name.trim()) {
      e.name = 'Recipient name is required'
      valid = false
    }
    if (!r.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) {
      e.email = 'Invalid email address'
      valid = false
    }
    if (!r.phone.trim() || r.phone.replace(/\D/g, '').length < 5) {
      e.phone = 'Phone number is required'
      valid = false
    }
    return e
  })
  return valid
}

function goToStep2() {
  const buyerValid = validateBuyer()
  const recipientsValid = validateRecipients()
  if (buyerValid && recipientsValid) {
    currentStep.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
    nextTick(() => {
      if (paymentMethod.value === 'card') mountStripeElements()
    })
  } else {
    const firstError = document.querySelector('.error, .err-msg')
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
const paymentMethod = ref('card')

watch(paymentMethod, (val) => {
  nextTick(() => {
    if (val === 'card') mountStripeElements()
    else destroyStripeElements()
  })
})
const bankList = [
  {
    id: 'bca',
    name: 'Bank Central Asia (BCA)',
    abbr: 'BCA',
    accountNumber: '1234567890',
    accountHolder: 'QurbanHub Indonesia',
    color: '#0066AE',
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    abbr: 'MDR',
    accountNumber: '1100098765432',
    accountHolder: 'QurbanHub Indonesia',
    color: '#003D8F',
  },
  {
    id: 'bni',
    name: 'Bank Negara Indonesia (BNI)',
    abbr: 'BNI',
    accountNumber: '0123456789',
    accountHolder: 'QurbanHub Indonesia',
    color: '#FF6600',
  },
  {
    id: 'bri',
    name: 'Bank Rakyat Indonesia (BRI)',
    abbr: 'BRI',
    accountNumber: '12345-01-000001-30-1',
    accountHolder: 'QurbanHub Indonesia',
    color: '#005CA8',
  },
]
const selectedBank = ref(null)
const copiedBank = ref(null)
const transferErrors = ref({ bank: '' })
const selectedBankData = computed(() => bankList.find((b) => b.id === selectedBank.value) || null)

function copyToClipboard(text, bankId) {
  navigator.clipboard.writeText(text).then(() => {
    copiedBank.value = bankId
    setTimeout(() => {
      copiedBank.value = null
    }, 2000)
  })
}

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
let stripe = null,
  elements = null,
  cardNumber = null,
  cardExpiry = null,
  cardCvc = null

const stripeReady = ref(false)
const focusedField = ref(null)
const cardholderName = ref('')
const stripeErrors = ref({
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  cardholderName: '',
  general: '',
})

async function mountStripeElements() {
  if (cardNumber) return
  stripe = await loadStripe(STRIPE_PUBLIC_KEY)
  elements = stripe.elements({
    appearance: {
      theme: 'flat',
      variables: {
        colorPrimary: '#2d5a2d',
        colorBackground: '#ffffff',
        colorText: '#4a4843',
        colorDanger: '#dc2626',
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSizeBase: '14px',
        borderRadius: '10px',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          border: '1.5px solid #e8e6df',
          boxShadow: 'none',
          padding: '12px 14px',
          fontSize: '14px',
          color: '#4a4843',
          backgroundColor: '#ffffff',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        },
        '.Input:focus': {
          border: '1.5px solid #2d5a2d',
          boxShadow: '0 0 0 3px rgba(45,90,45,0.08)',
        },
        '.Input--invalid': {
          border: '1.5px solid #dc2626',
          boxShadow: '0 0 0 3px rgba(220,38,38,0.06)',
        },
        '.Label': { display: 'none' },
      },
    },
  })
  const fieldStyle = {
    base: {
      fontSize: '14px',
      color: '#4a4843',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      fontWeight: '400',
      '::placeholder': { color: '#a09e96' },
    },
    invalid: { color: '#dc2626' },
  }
  cardNumber = elements.create('cardNumber', { style: fieldStyle, showIcon: true })
  cardExpiry = elements.create('cardExpiry', { style: fieldStyle })
  cardCvc = elements.create('cardCvc', { style: fieldStyle })
  cardNumber.mount('#card-number-element')
  cardExpiry.mount('#card-expiry-element')
  cardCvc.mount('#card-cvc-element')
  cardNumber.on('focus', () => (focusedField.value = 'number'))
  cardNumber.on('blur', () => (focusedField.value = null))
  cardExpiry.on('focus', () => (focusedField.value = 'expiry'))
  cardExpiry.on('blur', () => (focusedField.value = null))
  cardCvc.on('focus', () => (focusedField.value = 'cvc'))
  cardCvc.on('blur', () => (focusedField.value = null))
  cardNumber.on('change', ({ error }) => {
    stripeErrors.value.cardNumber = error ? error.message : ''
  })
  cardExpiry.on('change', ({ error }) => {
    stripeErrors.value.cardExpiry = error ? error.message : ''
  })
  cardCvc.on('change', ({ error }) => {
    stripeErrors.value.cardCvc = error ? error.message : ''
  })
  stripeReady.value = true
}

function destroyStripeElements() {
  if (cardNumber) {
    cardNumber.destroy()
    cardNumber = null
  }
  if (cardExpiry) {
    cardExpiry.destroy()
    cardExpiry = null
  }
  if (cardCvc) {
    cardCvc.destroy()
    cardCvc = null
  }
  stripeReady.value = false
}

onUnmounted(() => destroyStripeElements())

const agreedToTerms = ref(false)
const isProcessing = ref(false)
const showSuccess = ref(false)
const orderNumber = ref('')

const trustList = [
  'Animals certified by veterinarians',
  'Slaughter by trained halal butchers',
  'Distribution report with photos',
  '100% Sharia compliant',
]

async function handlePayment() {
  if (!agreedToTerms.value) return

  if (paymentMethod.value === 'transfer') {
    transferErrors.value.bank = ''
    // if (!selectedBank.value) {
    //   transferErrors.value.bank = 'Please select a bank account to transfer to'
    //   return
    // }
    isProcessing.value = true
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/checkout/create-bank-transfer-order`,
        {
          product_id: productId.value,
          quantity: quantity.value,
          purchase_type: purchaseType.value,
          total_price: totalPrice.value,
          bank_id: selectedBank.value,
          billing: {
            first_name: buyer.value.firstName,
            last_name: buyer.value.lastName,
            phone: buyer.value.phone,
            email: buyer.value.email,
            country: buyer.value.country,
            country_code: buyer.value.countryCode,
          },
          recipients: allRecipients.value.map((r) => ({
            qurban_name: r.name,
            email: r.email || null,
            phone_number: r.phone || null,
            remarks: null,
          })),
        },
      )
      orderNumber.value =
        (data.order_code || '').slice(-6).toUpperCase() ||
        Math.random().toString(36).slice(-6).toUpperCase()
      showSuccess.value = true
    } catch (err) {
      transferErrors.value.bank =
        err?.response?.data?.message || 'An error occurred. Please try again.'
    } finally {
      isProcessing.value = false
    }
    return
  }
  if (!stripeReady.value) return
  if (!cardholderName.value.trim()) {
    stripeErrors.value.cardholderName = 'Cardholder name is required'
    return
  }
  stripeErrors.value.cardholderName = ''
  stripeErrors.value.general = ''
  isProcessing.value = true
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/checkout/create-payment-intent`,
      {
        product_id: productId.value,
        quantity: quantity.value,
        purchase_type: purchaseType.value,
        total_price: totalPrice.value,
        billing: {
          first_name: buyer.value.firstName,
          last_name: buyer.value.lastName,
          phone: buyer.value.phone,
          email: buyer.value.email,
          country: buyer.value.country,
          country_code: buyer.value.countryCode,
        },
        shipping: {
          first_name: buyer.value.firstName,
          last_name: buyer.value.lastName,
          phone: buyer.value.phone,
          email: buyer.value.email,
          country: buyer.value.country,
          country_code: buyer.value.countryCode,
        },
        recipients: allRecipients.value.map((r) => ({
          qurban_name: r.name,
          email: r.email || null,
          phone_number: r.phone || null,
          remarks: null,
        })),
      },
    )
    const clientSecret = data.client_secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: {
          name: cardholderName.value,
          email: buyer.value.email,
          phone: buyer.value.phone,
        },
      },
    })
    if (error) {
      stripeErrors.value.general = error.message
      return
    }
    if (paymentIntent.status === 'succeeded') {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/checkout/confirm-payment`, {
        order_code: data.order_code,
        payment_intent_id: paymentIntent.id,
      })
      orderNumber.value = paymentIntent.id.slice(-6).toUpperCase()
      showSuccess.value = true
    }
  } catch (err) {
    stripeErrors.value.general =
      err?.response?.data?.message || 'An error occurred. Please try again.'
  } finally {
    isProcessing.value = false
  }
}

function formatPrice(val) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
  }).format(Number(val ?? 0))
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

.custom-select-container {
  position: relative;
  width: 100%;
}
.selected-country {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: white;
  border: 1.5px solid var(--gr200);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 48px;
}
.selected-country:hover {
  border-color: var(--g600);
}
.selected-country.error {
  border-color: #dc2626;
}
.flag-icon {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
  border: 1px solid #eee;
}
.placeholder {
  color: #888;
}
.chevron {
  margin-left: auto;
  font-size: 10px;
  color: #888;
}
.dropdown-list {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 8px;
}
.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}
.search-input:focus {
  border-color: var(--g600);
}
.options-container {
  max-height: 250px;
  overflow-y: auto;
}
.options-container::-webkit-scrollbar {
  width: 5px;
}
.options-container::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
.option-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  font-size: 14px;
}
.option-item:hover {
  background: #f5f8f5;
}


.phone-input-wrapper {
  display: flex;
  align-items: stretch;
  border: 1.5px solid var(--gr200);
  border-radius: 10px;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  overflow: visible;
  position: relative;
}
.phone-input-wrapper:focus-within {
  border-color: var(--g600);
  box-shadow: 0 0 0 3px rgba(122, 28, 46, 0.08);
}
.phone-input-wrapper.phone-input-error {
  border-color: var(--err);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.06);
}
.phone-dial-selector {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px 0 12px;
  border-right: 1.5px solid var(--gr200);
  cursor: pointer;
  min-width: 86px;
  flex-shrink: 0;
  position: relative;
  user-select: none;
  border-radius: 8px 0 0 8px;
  transition: background 0.15s;
}
.phone-dial-selector:hover {
  background: var(--gr100);
}
.dial-code-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--g800);
  white-space: nowrap;
}
.dial-badge {
  margin-left: auto;
  font-size: 11px;
  color: var(--gr400);
  flex-shrink: 0;
}
.phone-dropdown {
  left: 0;
  min-width: 280px;
  right: auto;
}
.phone-number-input {
  flex: 1;
  height: 44px;
  border: none !important;
  border-radius: 0 10px 10px 0 !important;
  padding: 0 14px !important;
  outline: none !important;
  box-shadow: none !important;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
  background: transparent;
}
.phone-number-input:focus {
  border: none !important;
  box-shadow: none !important;
}

.purchase-type-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}
.type-option {
  padding: 14px 16px;
  border: 1.5px solid var(--gr200);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: all 0.2s;
  background: white;
}
.type-option:hover {
  border-color: var(--g600);
  background: var(--gr100);
}
.type-option.active {
  border-color: var(--g700);
  background: rgba(122, 28, 46, 0.04);
  box-shadow: 0 4px 12px rgba(122, 28, 46, 0.08);
}
.option-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--gr300, #ccc);
  margin-top: 2px;
  position: relative;
  flex-shrink: 0;
}
.type-option.active .option-check {
  border-color: var(--g700);
  background: var(--g700);
}
.type-option.active .option-check::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
}
.option-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--g800);
  margin-bottom: 2px;
}
.option-desc {
  font-size: 12px;
  color: var(--gr400);
  line-height: 1.4;
}

.purchase-type-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  background: var(--gold-p);
  color: var(--g800);
  padding: 2px 8px;
  border-radius: 4px;
  margin: 4px 0;
  border: 1px solid var(--gold);
}

.recipients-list-container {
  max-height: 560px;
  overflow-y: auto;
  padding-right: 8px;
}
.recipients-list-container::-webkit-scrollbar {
  width: 6px;
}
.recipients-list-container::-webkit-scrollbar-track {
  background: var(--gr100, #f1f1f1);
  border-radius: 4px;
}
.recipients-list-container::-webkit-scrollbar-thumb {
  background: var(--gr300, #ccc);
  border-radius: 4px;
}
.recipients-list-container::-webkit-scrollbar-thumb:hover {
  background: var(--gr400, #aaa);
}

.checkout-page {
  --g900: #2e0a11;
  --g800: #4a101b;
  --g700: #7a1c2e;
  --g600: #ad1515;
  --gold: #c9a227;
  --gold-l: #e8c84a;
  --gold-p: #fdf3d0;
  --cream: #faf8f2;
  --white: #ffffff;
  --gr100: #f4f4f0;
  --gr200: #e8e6df;
  --gr400: #a09e96;
  --gr700: #4a4843;
  --err: #dc2626;
  min-height: 100vh;
  background: var(--cream);
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
}

.bg-pattern {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(46, 10, 17, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(201, 162, 39, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.checkout-header {
  background: var(--g900);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 24px;
}
.logo {
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  flex-shrink: 0;
}
.logo-qurban {
  color: var(--white);
}
.logo-hub {
  color: var(--gold);
}
.header-steps {
  display: flex;
  align-items: center;
  gap: 8px;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.45;
  transition: opacity 0.3s;
}
.step.active {
  opacity: 1;
}
.step.done {
  opacity: 0.7;
}
.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--white);
  transition: all 0.3s;
}
.step.active .step-num {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--g900);
}
.step.done .step-num {
  background: rgba(201, 162, 39, 0.3);
  border-color: var(--gold);
  color: var(--gold);
}
.step span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}
.step-line {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  transition: background 0.3s;
}
.step-line.done {
  background: rgba(201, 162, 39, 0.5);
}

.checkout-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  position: relative;
  z-index: 1;
}
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

.form-card {
  background: var(--white);
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--gr200);
}
.section-block {
  margin-bottom: 8px;
}
.quantity-wrapper {
  background: var(--gr100);
  border: 1.5px solid var(--gr200);
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.quantity-product-preview {
  flex: 1;
  min-width: 140px;
}
.qty-product-name {
  font-weight: 600;
  color: var(--g800);
  font-size: 15px;
  margin-bottom: 2px;
  font-family: 'Playfair Display', serif;
}
.qty-product-price {
  font-size: 13px;
  color: var(--gr400);
}
.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--white);
  border: 1.5px solid var(--gr200);
  border-radius: 12px;
  overflow: hidden;
}
.qty-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--g700);
  transition: background 0.15s;
}
.qty-btn:hover:not(:disabled) {
  background: var(--gr100);
}
.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.qty-display {
  min-width: 64px;
  text-align: center;
  padding: 0 8px;
  border-left: 1px solid var(--gr200);
  border-right: 1px solid var(--gr200);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}
.qty-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--g800);
  line-height: 1;
}
.qty-label {
  font-size: 10px;
  color: var(--gr400);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.qty-total-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
}
.qty-total-label {
  font-size: 11px;
  color: var(--gr400);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.qty-total-amount {
  font-size: 18px;
  font-weight: 700;
  color: var(--g800);
}
.section-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 32px 0 28px;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: var(--gr200);
}
.divider-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--g700);
  background: var(--gold-p);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 20px;
  padding: 6px 14px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.recipients-intro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.recipients-intro p {
  font-size: 14px;
  color: var(--gr400);
  margin: 0;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 2px solid var(--gr100);
}
.card-icon {
  width: 48px;
  height: 48px;
  background: var(--gold-p);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--g700);
}
.card-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--g800);
  margin: 0 0 4px;
}
.card-header p {
  font-size: 14px;
  color: var(--gr400);
  margin: 0;
}
.quota-badge {
  background: var(--gold-p);
  color: var(--gold);
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field.full {
  grid-column: 1 / -1;
}
label {
  font-size: 13px;
  font-weight: 600;
  color: var(--g800);
  letter-spacing: 0.01em;
}
.req {
  color: var(--gold);
}
.opt {
  color: var(--gr400);
  font-weight: 400;
}
input[type='text'],
input[type='email'],
input[type='tel'] {
  height: 46px;
  padding: 0 14px;
  border: 1.5px solid var(--gr200);
  border-radius: 10px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
  background: var(--white);
  transition: all 0.2s;
  outline: none;
}
input::placeholder {
  color: var(--gr400);
}
input:focus {
  border-color: var(--g600);
  box-shadow: 0 0 0 3px rgba(122, 28, 46, 0.08);
}
input.error {
  border-color: var(--err);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.06);
}
.err-msg {
  font-size: 12px;
  color: var(--err);
  font-weight: 500;
}

.recipient-block {
  border: 1.5px solid var(--gr200);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
  background: var(--gr100);
}
.recipient-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-weight: 600;
  color: var(--g800);
  font-size: 14px;
}
.recipient-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--g800);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.recipient-animal-tag {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--gold);
  background: rgba(201, 162, 39, 0.12);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 20px;
  padding: 2px 9px;
}
.payment-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  padding: 4px;
  background: var(--gr100);
  border-radius: 14px;
  border: 1px solid var(--gr200);
}
.pay-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  border: none;
  border-radius: 11px;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  color: var(--gr400);
  cursor: pointer;
  transition: all 0.2s;
}
.pay-tab:hover {
  color: var(--g700);
}
.pay-tab.active {
  background: var(--white);
  color: var(--g800);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.bank-transfer-section {
  margin-bottom: 24px;
}
.transfer-intro {
  font-size: 14px;
  color: var(--gr400);
  margin: 0 0 20px;
  line-height: 1.5;
}
.bank-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bank-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1.5px solid var(--gr200);
  border-radius: 14px;
  background: var(--white);
  cursor: pointer;
  transition: all 0.2s;
}
.bank-item:hover {
  border-color: rgba(122, 28, 46, 0.3);
  background: rgba(122, 28, 46, 0.02);
}
.bank-item.selected {
  border-color: var(--g600);
  background: rgba(122, 28, 46, 0.03);
  box-shadow: 0 0 0 3px rgba(122, 28, 46, 0.08);
}
.bank-radio {
  flex-shrink: 0;
}
.radio-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--gr200);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.radio-dot.active {
  border-color: var(--g600);
}
.radio-dot.active::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--g600);
}
.bank-logo {
  width: 46px;
  height: 30px;
  border-radius: 6px;
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.03em;
}
.bank-info {
  flex: 1;
  min-width: 0;
}
.bank-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--g800);
  margin-bottom: 4px;
}
.bank-account-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}
.bank-account-num {
  font-size: 15px;
  font-weight: 700;
  color: var(--g900);
  font-family: monospace;
  letter-spacing: 0.05em;
}
.copy-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid var(--gr200);
  background: var(--gr100);
  color: var(--gr700);
  cursor: pointer;
  transition: all 0.15s;
}
.copy-btn:hover {
  border-color: var(--g600);
  color: var(--g600);
}
.copy-btn.copied {
  border-color: #6bcb77;
  color: #3a8a3a;
  background: rgba(107, 203, 119, 0.1);
}
.bank-holder {
  font-size: 12px;
  color: var(--gr400);
}
.transfer-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  padding: 14px 16px;
  background: var(--gold-p);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 12px;
  font-size: 13px;
  color: var(--gr700);
  line-height: 1.5;
}
.transfer-note strong {
  font-weight: 600;
  color: var(--g800);
}

.card-brands {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 14px 16px;
  background: var(--gr100);
  border-radius: 12px;
  border: 1px solid var(--gr200);
  flex-wrap: wrap;
}
.brand-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--gr700);
}
.secure-badge {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--g700);
  background: rgba(122, 28, 46, 0.08);
  border: 1px solid rgba(122, 28, 46, 0.15);
  border-radius: 20px;
  padding: 4px 10px;
}

.stripe-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
}
.stripe-field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.stripe-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--g800);
  letter-spacing: 0.01em;
}
.stripe-input {
  border: 1.5px solid var(--gr200);
  border-radius: 10px;
  padding: 13px 14px;
  background: var(--white);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  min-height: 46px;
}
.stripe-input.stripe-focus {
  border-color: var(--g600);
  box-shadow: 0 0 0 3px rgba(45, 90, 45, 0.08);
}
.stripe-input.stripe-error {
  border-color: var(--err);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.06);
}
.stripe-text-input {
  padding: 0 14px !important;
  height: 46px !important;
  min-height: 46px !important;
  border: 1.5px solid var(--gr200) !important;
  border-radius: 10px !important;
  font-size: 14px !important;
  font-family: 'DM Sans', sans-serif !important;
  color: var(--gr700) !important;
  background: var(--white) !important;
  transition: all 0.2s !important;
  outline: none !important;
  display: block;
  width: 100%;
  box-sizing: border-box;
}
.stripe-text-input:focus {
  border-color: var(--g600) !important;
  box-shadow: 0 0 0 3px rgba(122, 28, 46, 0.08) !important;
}
.stripe-text-input.stripe-error {
  border-color: var(--err) !important;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.06) !important;
}
.stripe-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.stripe-err-msg {
  font-size: 12px;
  color: var(--err);
  font-weight: 500;
}
.stripe-general-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(220, 38, 38, 0.05);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 10px;
  font-size: 13px;
  color: var(--err);
  font-weight: 500;
}
.btn-next {
  margin-top: 32px;
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, var(--g700), var(--g900));
  color: var(--gold-l);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
}
.btn-next:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(29, 58, 29, 0.3);
}
.btn-next .arrow {
  font-size: 18px;
  transition: transform 0.2s;
}
.btn-next:hover .arrow {
  transform: translateX(4px);
}
.btn-row {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}
.btn-back {
  height: 52px;
  padding: 0 20px;
  background: transparent;
  border: 1.5px solid var(--gr200);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  color: var(--gr700);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.btn-back:hover {
  border-color: var(--g700);
  color: var(--g700);
  background: rgba(122, 28, 46, 0.04);
}
.btn-pay {
  flex: 1;
  height: 52px;
  background: linear-gradient(135deg, var(--gold), #b8941f);
  color: var(--g900);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-pay:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.4);
}
.btn-pay:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.loading-stripe {
  font-size: 14px;
  opacity: 0.7;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(46, 10, 17, 0.2);
  border-top-color: var(--g900);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.terms-box {
  padding: 16px;
  background: var(--gr100);
  border-radius: 10px;
  margin-bottom: 4px;
}
.terms-check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--gr700);
  cursor: pointer;
}
.terms-check input {
  margin-top: 2px;
  width: 16px;
  height: 16px;
  accent-color: var(--g700);
  flex-shrink: 0;
}
.terms-check a {
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
}
.terms-check a:hover {
  text-decoration: underline;
}
.summary-column {
  position: sticky;
  top: 88px;
}
.summary-card {
  background: var(--g900);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 40px rgba(46, 10, 17, 0.25);
}
.summary-header {
  margin-bottom: 24px;
}
.halal-badge {
  display: inline-block;
  background: rgba(201, 162, 39, 0.15);
  border: 1px solid rgba(201, 162, 39, 0.3);
  color: var(--gold-l);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}
.summary-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--white);
  margin: 0;
}
.product-hero {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.animal-icon-wrap {
  flex-shrink: 0;
}
.product-name {
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 4px;
}
.product-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}
.product-share {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--gold-l);
  font-weight: 500;
}
.price-breakdown {
  margin-bottom: 24px;
}
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.75);
}
.price-row span:last-child {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
.free {
  color: #6bcb77 !important;
  font-weight: 600 !important;
}
.price-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 8px 0;
}
.price-row.total {
  font-size: 16px;
  font-weight: 700;
  color: var(--white);
  margin-top: 4px;
}
.price-row.total span:first-child {
  color: rgba(255, 255, 255, 0.85);
}
.total-amount {
  color: var(--gold-l) !important;
  font-size: 18px;
  font-weight: 700 !important;
}

.quantity-row {
  align-items: center;
}
.inline-qty-ctrl {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2px 6px;
}
.inline-qty-btn {
  background: none;
  border: none;
  color: var(--gold-l);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.15s;
}
.inline-qty-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}
.inline-qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.inline-qty-num {
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  min-width: 20px;
  text-align: center;
}

.trust-items {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}
.contact-help {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(201, 162, 39, 0.1);
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 12px;
}
.contact-help strong {
  display: block;
  font-size: 13px;
  color: var(--gold-l);
  margin-bottom: 2px;
}
.contact-help p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}
.contact-help a {
  color: var(--gold-l);
  text-decoration: none;
  font-weight: 600;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  backdrop-filter: blur(4px);
}
.modal-box {
  background: var(--white);
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 460px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
}
.payment-method-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.payment-info-box {
  background: #f8f8f7;
  border: 1px solid #e5e2dc;
  border-radius: 16px;
  padding: 24px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item p {
  margin: 0;
  color: #555;
  line-height: 1.7;
}

.info-icon {
  font-size: 20px;
  margin-top: 2px;
}

.payment-total-box {
  background: #fff6db;
  border: 1px solid #f1d98c;
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  align-items: flex-start;
  color: #6b5a2b;
  line-height: 1.7;
}

.payment-agreement {
  background: #f8f8f7;
  border-radius: 14px;
  padding: 18px 20px;
}

.payment-agreement a {
  color: #c59d1a;
  text-decoration: none;
  font-weight: 600;
}

.payment-actions {
  display: flex;
  gap: 16px;
}

.place-order-btn {
  flex: 1;
  background: #c9a227;
  border: none;
  color: #2d1600;
  font-weight: 600;
  padding: 14px;
  border-radius: 12px;
}

.place-order-btn:hover {
  background: #b8921f;
}
.modal-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f9f2f3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.modal-box h3 {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  color: var(--g800);
  margin: 0 0 12px;
}
.modal-box p {
  font-size: 14px;
  color: var(--gr400);
  line-height: 1.6;
  margin: 0 0 20px;
}
.modal-order {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 24px;
  background: var(--gold-p);
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--gr700);
}
.modal-order strong {
  font-size: 18px;
  color: var(--g800);
  font-weight: 700;
}
.modal-transfer-info {
  background: var(--gr100);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: left;
}
.modal-transfer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  color: var(--gr700);
  border-bottom: 1px solid var(--gr200);
}
.modal-transfer-row:last-child {
  border-bottom: none;
}
.modal-transfer-row strong {
  color: var(--g800);
  font-weight: 600;
}
.transfer-amount-highlight {
  color: var(--g700) !important;
  font-size: 15px !important;
}
.modal-note {
  font-size: 13px !important;
}
.btn-home {
  display: inline-block;
  margin-top: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--g700), var(--g900));
  color: var(--gold-l);
  border-radius: 12px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-home:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(46, 10, 17, 0.3);
}
.slide-fade-enter-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
  .summary-column {
    position: static;
    order: -1;
  }
  .header-steps .step span {
    display: none;
  }
  .step-line {
    width: 24px;
  }
}
@media (max-width: 600px) {
  .form-card {
    padding: 24px 18px;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .field.full {
    grid-column: auto;
  }
  .checkout-main {
    padding: 20px 16px 60px;
  }
  .header-inner {
    padding: 0 16px;
  }
  .summary-card {
    padding: 20px;
  }
  .stripe-row {
    grid-template-columns: 1fr;
  }
  .card-brands {
    flex-wrap: wrap;
  }
  .secure-badge {
    margin-left: 0;
  }
  .recipients-intro {
    flex-direction: column;
    align-items: flex-start;
  }
  .quantity-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .qty-total-row {
    align-items: flex-start;
  }
  .pay-tab {
    font-size: 12px;
    gap: 5px;
  }
  .phone-dropdown {
    min-width: 240px;
  }
}
</style>