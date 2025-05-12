class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const message = this.createChatBotMessage("Hello! How can I assist you with organic products today?");
    this.updateChatbotState(message);
  }

  handleProductInquiry(productCategory) {
    const responses = {
      coffee: "We have freshly roasted organic coffee beans sourced directly from farmers. Would you like to explore our single-origin or blend options?",
      "dairy products": "Our dairy products are pure, organic and ethically sourced. We offer milk, cheese, butter and yogurt from pasture-raised animals.",
      "dry fruits": "We have a premium selection of organic dry fruits, perfect for healthy snacking and cooking. All sustainably sourced and naturally dried.",
      fruits: "All our fruits are organically grown without chemical pesticides. We offer seasonal varieties delivered at peak freshness.",
      "handmade arts": "Our handmade arts collection features unique pieces crafted by village artisans using traditional techniques and natural materials.",
      medicines: "We provide ayurvedic & organic medicines prepared with authentic herbs. These formulations follow time-tested traditional recipes.",
      oils: "We offer cold-pressed organic oils for cooking & skincare, extracted using traditional methods to preserve nutrients and flavor.",
      "personal care": "Explore our organic personal care products made with natural ingredients that are gentle on your skin and the environment.",
      pulses: "We have high-quality organic pulses for a healthy diet, cultivated using sustainable farming practices without chemical fertilizers.",
      vegetables: "Fresh organic vegetables delivered to your doorstep! Grown using natural farming methods that protect soil health and biodiversity.",
    };

    const message = this.createChatBotMessage(responses[productCategory] || "I'd be happy to assist you with any questions about our organic products.");
    this.updateChatbotState(message);
    
    // Show options again after response
    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage("Is there anything else you'd like to know about?", {
        widget: "options",
        delay: 500,
      });
      this.updateChatbotState(followUpMessage);
    }, 1000);
  }

  handleCoffee() {
    this.handleProductInquiry("coffee");
  }

  handleDairy() {
    this.handleProductInquiry("dairy products");
  }

  handleDryFruits() {
    this.handleProductInquiry("dry fruits");
  }

  handleFruits() {
    this.handleProductInquiry("fruits");
  }

  handleHandmadeArts() {
    this.handleProductInquiry("handmade arts");
  }

  handleMedicines() {
    this.handleProductInquiry("medicines");
  }

  handleOils() {
    this.handleProductInquiry("oils");
  }

  handlePersonalCare() {
    this.handleProductInquiry("personal care");
  }

  handlePulses() {
    this.handleProductInquiry("pulses");
  }

  handleVegetables() {
    this.handleProductInquiry("vegetables");
  }

  handleOrder() {
    const message = this.createChatBotMessage("To place an order, simply select your products and proceed to checkout. We offer secure payment options and delivery tracking.");
    this.updateChatbotState(message);
  }

  handlePayment() {
    const message = this.createChatBotMessage("We accept multiple payment methods including credit/debit cards, net banking, UPI, and cash on delivery. All transactions are secured with encryption.");
    this.updateChatbotState(message);
  }

  handleRefund() {
    const message = this.createChatBotMessage("Our refund policy ensures you're satisfied with your purchase. If you're not happy with any product, you can return it within 7 days for a full refund or replacement.");
    this.updateChatbotState(message);
  }

  handleUnknown() {
    const message = this.createChatBotMessage("I'm not sure I understand. Would you like to explore our product categories?", {
      widget: "options",
    });
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;