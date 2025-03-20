let quoteId = 1;                // Variable to store the quote id
let quote = '';                 // Variable to store the quote
let author = '';                // Variable to store the author
let createdDate = '';           // Variable to store the quote created date

// BackgroundImages Path, Suitable colors for quotes and authors on each image
const quotesBgImg = [
    {
        url: 'assets/quote-bg-1.jpg',
        quoteText: '#005555',
        authorText: '#cadfdc'
    },
    {
        url: 'assets/quote-bg-2.jpg',
        quoteText: '#1a1b1d',
        authorText: '#CCCCCC'
    },
    {
        url: 'assets/quote-bg-3.jpg',
        quoteText: '#222222',
        authorText: '#222222'
    },
    {
        url: 'assets/quote-bg-4.jpg',
        quoteText: '#030606',
        authorText: '#FFD700'
    },
    {
        url: 'assets/quote-bg-5.jpg',
        quoteText: '#090f0f',
        authorText: '#FFFFFF'
    },
    {
        url: 'assets/quote-bg-6.jpg',
        quoteText: '#660000',
        authorText: '#660000'
    },
    {
        url: 'assets/quote-bg-7.jpg',
        quoteText: '#002244',
        authorText: '#002244'
    },
    {
        url: 'assets/quote-bg-8.jpg',
        quoteText: '#1d180d',
        authorText: '#F5E1C8'
    },
    {
        url: 'assets/quote-bg-9.jpg',
        quoteText: '#001408',
        authorText: '#F8F8F8'
    }
];

// Document Selectors to manipulate DOM
const quotesBackgroundContainer = document.getElementById('quotesBackground');
const quoteContainer = document.getElementById('quote');
const authorContainer = document.getElementById('author');
const newQuoteContainer = document.getElementById('newQuote');
const copyButtonContainer = document.getElementById('copyButton');
const copyMessageContainer = document.getElementById('copyMessage');
const shareButtonContainer = document.getElementById('shareButton');

// Function to load and store quote and related details via API call
const generateQuotesApiCall = async() => {
    // API Call
    let loadQuotesRecords = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random').then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Api Request Failed to load the data');
        }
    });

    if (loadQuotesRecords.success) {
        quoteId = loadQuotesRecords.data.id;
        quote = loadQuotesRecords.data.content;
        author = loadQuotesRecords.data.author;
        createdDate = loadQuotesRecords.data.dateAdded;
    } else {
        throw new Error('Failed to load the quotes');
    }
}

// Function to display the generated quote in UI
const loadQuote = async() => {
    await generateQuotesApiCall();

    const randomNumber = Math.floor(Math.random() * 9);

    // Assign background image
    quotesBackgroundContainer.src = quotesBgImg[randomNumber].url;
    quoteContainer.innerText = quote;
    authorContainer.innerText = author;

    quoteContainer.style.color = quotesBgImg[randomNumber].quoteText;
    authorContainer.style.color = quotesBgImg[randomNumber].authorText;
}

// Function to copy current quote to user clipboard
function copyQuote() {
    function showMessage() {
        copyMessageContainer.style.opacity = '1';
        setTimeout(() => {
            copyMessageContainer.style.opacity = '0';
        }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(quote).then(() => {
            showMessage();
        }).catch((err) => {
            console.error(`Failed to copy : ${err}`);
        });
    } else {
        // Fallback to old method - If navigator not working
        let quoteTextTA = document.createElement('textarea');
        quoteTextTA.value = quote;
        document.body.appendChild(quoteTextTA);
        quoteTextTA.select();
        document.execCommand('copy');
        document.body.removeChild(quoteTextTA);
        showMessage();
    }
}

// Function to share current quote on twitter
function shareQuote() {
    let twitterURI = `https://x.com/intent/tweet?text=${encodeURIComponent(quote)}%20%23Inspiration`;
    window.open(twitterURI, '_blank');
}

// Function to initialize an event on button click to generate new quote
const initializeNewQuoteBtn = () => {
    newQuoteContainer.addEventListener('click', () => {
        loadQuote();
    });
}

// Function to initialize an event on copy button
const initializeCopyQuoteBtn = () => {
    copyButton.addEventListener('click', copyQuote);
}

// Function to initialize an event on share button
const initializeShareQuoteBtn = () => {
    shareButton.addEventListener('click', shareQuote);
}

// Imediate execution of functions on loading the script
loadQuote();
initializeNewQuoteBtn();
initializeCopyQuoteBtn();
initializeShareQuoteBtn();
