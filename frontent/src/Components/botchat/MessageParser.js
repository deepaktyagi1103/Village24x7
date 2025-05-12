class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("coffee")) {
      this.actionProvider.handleCoffee();
    } else if (lowerCaseMessage.includes("dairy")) {
      this.actionProvider.handleDairy();
    } else if (lowerCaseMessage.includes("dry fruits")) {
      this.actionProvider.handleDryFruits();
    } else if (lowerCaseMessage.includes("fruits")) {
      this.actionProvider.handleFruits();
    } else if (lowerCaseMessage.includes("handmade") || lowerCaseMessage.includes("art")) {
      this.actionProvider.handleHandmadeArts();
    } else if (lowerCaseMessage.includes("medicine")) {
      this.actionProvider.handleMedicines();
    } else if (lowerCaseMessage.includes("oil")) {
      this.actionProvider.handleOils();
    } else if (lowerCaseMessage.includes("personal care")) {
      this.actionProvider.handlePersonalCare();
    } else if (lowerCaseMessage.includes("pulses")) {
      this.actionProvider.handlePulses();
    } else if (lowerCaseMessage.includes("vegetables") || lowerCaseMessage.includes("veggies")) {
      this.actionProvider.handleVegetables();
    } else if (lowerCaseMessage.includes("order") || lowerCaseMessage.includes("buy")) {
      this.actionProvider.handleOrder();
    } else if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("pay")) {
      this.actionProvider.handlePayment();
    } else if (lowerCaseMessage.includes("refund") || lowerCaseMessage.includes("return")) {
      this.actionProvider.handleRefund();
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey")) {
      this.actionProvider.greet();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;