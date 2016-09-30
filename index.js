'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Laundry Time';

/**
 * Array containing space facts.
 */
var FACTS = [
    "Separate your clothes into piles of  light colors, dark colors, and whites.",
    "Before you place your load in the washer turn your clothes inside out, close any zippers and check the pockets, that includes shirt pockets.",
    "Before you place your load in the washer turn your clothes inside out.",
    "Commonly, people sort their clothes by light colors, dark colors, and whites. 
    To get your clothes as clean as possible seperate them by 2 groups fabric type and soil level.",
    "When you place your clothes in the machine, do not over stuff, just fill the machine three fourth of the way and use one capful of the detergent.",
    "For whites set the water temperature to warm.",
    "For linen, towels, and smelly gym clothes set the water temperature to hot.",
    "For colors set the water temperature to cold.",
    "Set the wash cycle on reqular.",
    "Shake your wet or damp clothes befor placing them in the dryer.",
    "Set the dry cyle on regualr. If you set it too high or hot it will cause your clothes to shrink.",
    "Place dryer sheets in the dryer with your clothes to prevent static cling."

    
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a laundry tip, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};