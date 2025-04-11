document.addEventListener('DOMContentLoaded', () => {
    const responseElement = document.getElementById('response');
    const showAnotherButton = document.getElementById('show-another');
    const chatContainer = document.getElementById('chat-container');

    let recognition;
    let initialMessagesSpoken = false;

    const initRecognition = () => {
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log('Speech recognition started.');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            handleSpeech(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended.');
            if (!initialMessagesSpoken) {
                recognition.start(); // Restart recognition after initial messages
            }
        };

        if (!initialMessagesSpoken) {
            speakInitialMessages(); // Speak initial messages when web page loads
        }
    };

    const speakInitialMessages = () => {
        const initialMessages = [
            "Linking to mainframe...",
            "Installing system updates...",
            "Initializing server...",
            "Running diagnostics...",
            "Optimizing performance...",
        ];

        for (const message of initialMessages) {
            speak(message);
        }

        initialMessagesSpoken = true;
    };

    const handleSpeech = async (transcript) => {
        if (transcript.startsWith('pico')) {
            const question = transcript.slice(5).trim();
            const answer = await getAnswer(question);
            speak(answer);
            addChatMessage('User', question);
        }
    };

    const getAnswer = async (question) => {
        const localData = {
            "what is your name": "I'm Pico, an AI Voice Assistant by Phyniex.",
            "who created you": "Phyniex created me.",
            "who is your owner": "Phyniex is my owner.",
            // Add more responses as needed
        };

        const localResponse = localData[question.toLowerCase()];
        if (localResponse) {
            return localResponse;
        }

        try {
            const duckDuckGoAnswer = await fetchDuckDuckGoAnswer(question);
            return duckDuckGoAnswer;
        } catch (error) {
            console.error('Error fetching DuckDuckGo data:', error);
            return 'Sorry, I could not find information on that topic.';
        }
    };

    const fetchDuckDuckGoAnswer = async (query) => {
        // Implement DuckDuckGo API fetching logic here
    };

    const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        const maleVoice = window.speechSynthesis.getVoices().find(voice => voice.name.includes('Male'));
        utterance.voice = maleVoice || window.speechSynthesis.getVoices()[0];
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const addChatMessage = (sender, message) => {
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat');
        chatMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatContainer.appendChild(chatMessage);
    };

    const showAnother = () => {
        const lastQuery = showAnotherButton.getAttribute('data-query');
        const lastType = showAnotherButton.getAttribute('data-type');
        fetchPixabayData(lastQuery, lastType);
    };

    const getRandomAnimation = () => {
        const animations = ['moveUp', 'randomAnimation'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        document.getElementById('assistant-container').style.animation = randomAnimation + ' 2s infinite alternate';
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    initRecognition(); // Initialize recognition on page load

    getRandomAnimation(); // Initial random animation

    setInterval(() => {
        getRandomAnimation();
    }, 10000);
});