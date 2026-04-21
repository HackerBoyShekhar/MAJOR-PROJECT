import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Globe } from 'lucide-react';

const AIAssistant = ({ weather }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [lang, setLang] = useState('en');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const [menu, setMenu] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const translations = {
        en: {
            greeting: "Hello! I am your AI Chef. What are you craving today? 👨‍🍳",
            weatherHot: `It's quite hot at ${Math.round(weather?.temp || 30)}°C! I highly recommend our Iced Caramel Latte or a refreshing Mango Smoothie to cool down 🧊.`,
            weatherCold: `It's chilly outside (${Math.round(weather?.temp || 15)}°C)! A Hot Cappuccino or Masala Chai would be perfect right now ☕.`,
            weatherRain: `Rainy day? Crispy Samosas or Spicy Chicken Pakoda are the absolute best choice 🌧️.`,
            pricingInfo: "Our prices update in real-time based on local weather and current demand to give you the fairest deal! 📉✨",
            orderInfo: "Just click 'Add to Cart' on any item, then use the floating cart button to checkout. Easy peasy! 🛒",
            generic: "I'm still learning, but I'd love to help! Want a recommendation or curious about our dynamic prices? Just ask, bro! 😎",
            placeholder: "Ask for food recommendations...",
            ideaResult: "How about this? I think you'll love: ",
            notFound: "I couldn't find exactly that, but these are popular right now: "
        },
        'hi-en': { // Hinglish
            greeting: "Oye! Main hoon aapka AI Chef. Aaj kya khaane ka mann hai? 👨‍🍳",
            weatherHot: `Kaafi garmi hai, ${Math.round(weather?.temp || 30)}°C! Thandak ke liye Cold Coffee ya Mango Smoothie try karo, maza aa jayega! 🧊`,
            weatherCold: `Thand lag rahi hai na? Ek garma-garam Cappuccino ya Masala Chai ho jaye? ☕`,
            weatherRain: `Baarish wala mausam? Samosas aur Pakode are the best! 🌧️`,
            pricingInfo: "Humaari prices weather aur demand ke hisaab se change hoti rehti hain, taaki aapko best deal mile! 📉",
            orderInfo: "Bas 'Add to Cart' dabao aur cart button se checkout kar lo. Simple hai, bro! 🛒",
            generic: "Main abhi seekh raha hoon, par batao kya chahiye? Recommendations chahiye ya prices ke baare mein jaanna hai? Bindass pucho! 😎",
            placeholder: "Kuch pucho na...",
            ideaResult: "Ye try karo, ek number hai: ",
            notFound: "Woh toh nahi mila, par ye try karo, mast hai: "
        },
        hi: {
            greeting: "नमस्ते! मैं आपका एआई शेफ हूं। आज आप क्या खाना चाहेंगे? 👨‍🍳",
            weatherHot: `बाहर बहुत गर्मी है (${Math.round(weather?.temp || 30)}°C)! मैं आपको हमारी कोल्ड कॉफी या मैंगो स्मूदी की सलाह दूंगा। 🧊`,
            weatherCold: `बाहर ठंड है (${Math.round(weather?.temp || 15)}°C)! एक गरम कैपुचिनो या मसाला चाय बिल्कुल सही रहेगा। ☕`,
            weatherRain: `बारिश का दिन? क्रिस्पी समोसे या पकोड़े सबसे बढ़िया विकल्प हैं। 🌧️`,
            pricingInfo: "हमारी कीमतें मौसम और मांग के आधार पर बदलती हैं ताकि आपको सबसे सही दाम मिले! 📉",
            orderInfo: "बस 'कार्ट में जोड़ें' पर क्लिक करें और फिर चेकआउट करें। बहुत आसान है! 🛒",
            generic: "मैं अभी सीख रहा हूँ! लेकिन मैं खाने का सुझाव दे सकता हूँ या कीमतों के बारे में बता सकता हूँ। पूछिए! 😎",
            placeholder: "भोजन के सुझाव मांगें...",
            ideaResult: "इसके बारे में क्या ख्याल है? मुझे लगता है आपको यह पसंद आएगा: ",
            notFound: "मुझे वह नहीं मिला, लेकिन ये अभी बहुत लोकप्रिय हैं: "
        },
        jp: {
            greeting: "こんにちは！私はあなたのAIシェフです。今日は何が食べたいですか？ 👨‍🍳",
            weatherHot: `今日はとても暑いですね (${Math.round(weather?.temp || 30)}°C)！冷たいキャラメルラテやマンゴースムージーはいかがですか？ 🧊`,
            weatherCold: `外は冷え込んでいますね (${Math.round(weather?.temp || 15)}°C)！温かいカプチーノやマサラチャイがおすすめです。 ☕`,
            weatherRain: `雨の日ですか？サクサクのサモサやチキンパコダが最高ですよ。 🌧️`,
            pricingInfo: "価格は天気や需要に合わせてリアルタイムで更新されます！ 📉✨",
            orderInfo: "商品をカートに追加して、チェックアウトボタンを押すだけです！ 🛒",
            generic: "まだ勉強中ですが、お手伝いできます！おすすめを聞いたり、価格について質問したりしてください。 😎",
            placeholder: "おすすめを聞く...",
            ideaResult: "これはどうですか？きっと気に入るはずです：",
            notFound: "それについては見つかりませんでしたが、これらが人気です："
        },
        ar: {
            greeting: "أهلاً بك! أنا الشيف الآلي الخاص بك. ماذا تشتهي اليوم؟ 👨‍🍳",
            weatherHot: `الجو حار جداً (${Math.round(weather?.temp || 30)}°C)! أنصحك بقهوة كراميل مثلجة أو سموذي مانجو منعش. 🧊`,
            weatherCold: `الجو بارد بالخارج (${Math.round(weather?.temp || 15)}°C)! كابتشينو ساخن أو شاي ماسالا سيكون مثالياً الآن. ☕`,
            weatherRain: `يوم ممطر؟ السمبوسة المقرمشة أو باتوكا الدجاج هي الخيار الأفضل. 🌧️`,
            pricingInfo: "أسعارنا تتحدث في الوقت الطبيعي بناءً على الطقس والطلب لتوفير أفضل عرض لك! 📉",
            orderInfo: "فقط اضغط على 'أضف إلى السلة' ثم اذهب للدفع. الأمر سهل جداً! 🛒",
            generic: "ما زلت أتعلم، لكن يسعدني مساعدتك! هل تريد توصية أو استفسار عن الأسعار؟ 😎",
            placeholder: "اطلب توصية طعام...",
            ideaResult: "ما رأيك بهذا؟ أعتقد أنه سينال إعجابك: ",
            notFound: "لم أجد ذلك بالضبط، لكن هذه الأصناف مشهورة الآن: "
        },
        de: {
            greeting: "Hallo! Ich bin dein KI-Chef. Worauf hast du heute Hunger? 👨‍🍳",
            weatherHot: `Es ist ziemlich heiß (${Math.round(weather?.temp || 30)}°C)! Ich empfehle unseren Iced Caramel Latte oder einen erfrischenden Mango Smoothie. 🧊`,
            weatherCold: `Draußen ist es kühl (${Math.round(weather?.temp || 15)}°C)! Ein heißer Cappuccino oder Masala Chai wäre jetzt perfekt. ☕`,
            weatherRain: `Regentag? Knusprige Samosas oder Spicy Chicken Pakoda sind die beste Wahl. 🌧️`,
            pricingInfo: "Unsere Preise ändern sich in Echtzeit basierend auf Wetter und Nachfrage! 📉",
            orderInfo: "Klicke einfach auf 'In den Warenkorb' und dann auf den Einkaufswagen-Button. Ganz einfach! 🛒",
            generic: "Ich lerne noch, aber ich helfe gerne! Möchtest du eine Empfehlung oder hast du Fragen zu den Preisen? 😎",
            placeholder: "Frage nach Empfehlungen...",
            ideaResult: "Wie wäre es hiermit? Ich denke, das wird dir schmecken: ",
            notFound: "Das konnte ich nicht finden, aber diese hier sind gerade beliebt: "
        }
    };

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/menu');
                const data = await res.json();
                setMenu(data.menu || []);
            } catch (err) {
                console.error("Failed to fetch menu for AI Assistant");
            }
        };
        fetchMenu();
    }, []);

    const [lastSuggestedId, setLastSuggestedId] = useState(null);

    const getSmartResponse = (text, currentLang, currentWeather) => {
        const t = translations[currentLang] || translations.en;
        const lowerText = text.toLowerCase();
        
        // 1. Common Typos/Aliases Mapping
        const aliases = {
            'coffie': 'coffee',
            'coffe': 'coffee',
            'cofe': 'coffee',
            'chikn': 'chicken',
            'pakora': 'pakoda',
            'pakorda': 'pakoda',
            'veg': 'vegetarian',
            'nonveg': 'non-vegetarian',
            'non-veg': 'non-vegetarian',
            'egg': 'eggitarian'
        };

        let processedText = lowerText;
        Object.keys(aliases).forEach(typo => {
            if (processedText.includes(typo)) {
                processedText = processedText.replace(typo, aliases[typo]);
            }
        });

        // 2. Simple word extraction (filter out stop words)
        const stopWords = ['i', 'want', 'to', 'try', 'some', 'the', 'a', 'an', 'please', 'give', 'me', 'show', 'suggest', 'recommend', 'is', 'it', 'can', 'you', 'my', 'your', 'bro', 'brother', 'boy'];
        const words = processedText.split(/\s+/).filter(w => !stopWords.includes(w) && w.length > 2);

        // 3. Handle "No" or "Next" - suggest something different
        if (/(no|next|not this|another|different|boring|no thanks|nah)/.test(processedText) && lastSuggestedId) {
            const differentItems = menu.filter(i => i._id !== lastSuggestedId);
            const nextItem = differentItems[Math.floor(Math.random() * differentItems.length)];
            if (nextItem) {
                setLastSuggestedId(nextItem._id);
                return `${t.ideaResult} **${nextItem.name}**! It's a great alternative. ${nextItem.description}`;
            }
        }

        // 4. Tag based matching (spicy, veg, cold, etc.)
        const tags = {
            spicy: ['spicy', 'hot', 'chili', 'mirch', 'teekha'],
            veg: ['vegetarian', 'veg', 'shakahari'],
            'non-veg': ['non-veg', 'non-vegetarian', 'chicken', 'meat', 'beef', 'nonveg'],
            egg: ['egg', 'eggitarian', 'anda'],
            cold: ['cold', 'iced', 'chilled', 'ice', 'cool'],
            sweet: ['sweet', 'sugar', 'dessert', 'caramel', 'strawberry', 'mango'],
            healthy: ['healthy', 'salad', 'green', 'fresh'],
            heavy: ['burger', 'pizza', 'meal', 'filling', 'lunch', 'dinner'],
            light: ['snack', 'light', 'bite', 'quick', 'samosa', 'pakoda']
        };

        let matchedTagItems = [];
        for (const [tag, keywords] of Object.entries(tags)) {
            if (keywords.some(k => processedText.includes(k))) {
                matchedTagItems = menu.filter(item => 
                    item.name.toLowerCase().includes(tag) || 
                    item.description.toLowerCase().includes(tag) ||
                    item.foodType === tag ||
                    (tag === 'veg' && item.foodType === 'veg') ||
                    (tag === 'non-veg' && item.foodType === 'non-veg') ||
                    (tag === 'egg' && item.foodType === 'egg') ||
                    keywords.some(k => item.name.toLowerCase().includes(k) || item.description.toLowerCase().includes(k)) ||
                    (tag === 'heavy' && item.category === 'meal') ||
                    (tag === 'light' && item.category === 'snack') ||
                    (tag === 'cold' && item.category === 'cold_drink')
                );
                if (matchedTagItems.length > 0) break;
            }
        }

        if (matchedTagItems.length > 0) {
            const item = matchedTagItems[Math.floor(Math.random() * matchedTagItems.length)];
            setLastSuggestedId(item._id);
            return `${t.ideaResult} **${item.name}**! ${item.description}`;
        }

        // 5. Keyword check (searching menu for words in user input)
        if (words.length > 0) {
            const keywordMatches = menu.filter(item => 
                words.some(w => 
                    item.name.toLowerCase().includes(w) || 
                    item.description.toLowerCase().includes(w) ||
                    item.category?.toLowerCase().includes(w)
                )
            );
            if (keywordMatches.length > 0) {
                const item = keywordMatches[0];
                setLastSuggestedId(item._id);
                return `${t.ideaResult} **${item.name}**! I found this based on your request. ${item.description}`;
            }

            // 6. Specific "SORRY" if the user looked for something specific but we don't have it
            return lang === 'hi' ? "क्षमा करें, हमारे पास अभी वह उपलब्ध नहीं है। क्या आप कुछ और आज़माना चाहेंगे?" :
                   lang === 'hi-en' ? "Sorry bro, abhi wo available nahi hai. Kuch aur try karoge?" :
                   "Sorry! We don't have that on our menu right now. Maybe try something else?";
        }

        // 7. Fallback to Weather (only if no specific item keywords are found)
        if (/(suggest|recommend|what|food|hungry|eat|craving|menu|want|good|idea)/.test(processedText)) {
            let recItem;
            if (!currentWeather) recItem = menu.find(i => i.category === 'coffee');
            else if (currentWeather.temp > 28) recItem = menu.find(i => i.category === 'cold_drink');
            else if (currentWeather.condition?.toLowerCase().includes('rain')) recItem = menu.find(i => i.category === 'snack');
            else recItem = menu.find(i => i.category === 'coffee');

            if (recItem) {
                setLastSuggestedId(recItem._id);
                let weatherText = t.weatherCold;
                if (currentWeather?.temp > 30) weatherText = t.weatherHot;
                else if (currentWeather?.condition?.toLowerCase().includes('rain')) weatherText = t.weatherRain;
                
                return `${weatherText}\n\n${t.ideaResult} **${recItem.name}**!`;
            }
        }

        if (/(price|cost|expensive|cheap|dynamic|money|why|how much)/.test(lowerText)) {
            return t.pricingInfo;
        }
        if (/(hello|hi|hey|hola|bonjour|namaste|oye)/.test(lowerText)) {
            return t.greeting;
        }
        if (/(cart|order|buy|checkout)/.test(lowerText)) {
            return t.orderInfo;
        }

        // 5. Default with some items
        const randomItem = menu[Math.floor(Math.random() * menu.length)];
        if (randomItem) setLastSuggestedId(randomItem._id);
        return randomItem ? `${t.generic} Maybe you'd like to try our **${randomItem.name}**?` : t.generic;
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const t = translations[lang] || translations.en;
            setMessages([{ sender: 'ai', text: t.greeting }]);
            
            // Add a weather based recommendation slightly after
            setTimeout(() => {
                const t2 = translations[lang] || translations.en;
                if (!weather) return;
                setIsTyping(true);
                setTimeout(() => {
                    let rec = t2.weatherCold;
                    if (weather.temp > 30) rec = t2.weatherHot;
                    else if (weather.condition?.toLowerCase().includes('rain')) rec = t2.weatherRain;
                    
                    setMessages(prev => [...prev, { sender: 'ai', text: rec }]);
                    setIsTyping(false);
                }, 1000);
            }, 1500);
        }
    }, [isOpen, lang, weather]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Mock AI thinking & response
        setTimeout(() => {
            const aiResponse = getSmartResponse(userMsg, lang, weather);
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    // Handle Reappearance logic
    useEffect(() => {
        if (isRunning) {
            const timer = setTimeout(() => {
                setIsRunning(false);
                // Freshness: Add a "I'm back!" message
                const backGreeting = lang === 'en' ? "I'm back! Ready for more cravings? 🏃‍♂️✨" :
                                   lang === 'hi' ? "मैं वापस आ गया हूँ! क्या आप कुछ और खाना चाहेंगे? 🏃‍♂️✨" :
                                   translations[lang].greeting;
                
                setMessages([{ sender: 'ai', text: backGreeting }]);
            }, 6000); // 6 seconds to run away and come back fresh
            return () => clearTimeout(timer);
        }
    }, [isRunning, lang]);

    const handleLangChange = (e) => {
        setLang(e.target.value);
        setMessages([{ sender: 'ai', text: translations[e.target.value].greeting }]);
    };

    return (
        <div className={`fixed bottom-8 left-8 z-40 ${isRunning ? 'animate-boy-run pointer-events-none' : ''}`}>
            {/* Chatbot Window */}
            {isOpen && (
                <div className="absolute bottom-16 left-0 w-[340px] bg-white dark:bg-dark-100 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 transform origin-bottom-left animate-fade-in shadow-indigo-500/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-primary-600 p-4 flex items-center justify-between text-white shadow-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-white/20 flex-shrink-0">
                                <img src="/images/ai_boy_avatar.png" alt="AI Boy" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-wide">AI Food Genie</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative group flex items-center justify-center p-1.5 rounded-full hover:bg-white/20 transition-colors">
                                <Globe className="w-4 h-4 cursor-pointer" />
                                <select 
                                    value={lang} 
                                    onChange={handleLangChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                >
                                    <option value="en">English</option>
                                    <option value="hi-en">Hinglish</option>
                                    <option value="hi">हिंदी</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="jp">日本語</option>
                                    <option value="ar">العربية</option>
                                    <option value="de">Deutsch</option>
                                </select>
                            </div>
                             <button 
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsRunning(true);
                                    // Reset messages for freshness
                                    setMessages([]); 
                                }} 
                                className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="h-80 overflow-y-auto p-5 flex flex-col gap-4 bg-slate-50 dark:bg-[#0B1120] hide-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.sender === 'ai' ? 'bg-white dark:bg-dark-200 rounded-tl-sm border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300' : 'bg-indigo-600 text-white rounded-tr-sm self-end font-medium'}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                        {line.split('**').map((part, j) => j % 2 === 1 ? <strong key={j} className="text-primary-600 dark:text-primary-400 font-bold">{part}</strong> : part)}
                                    </p>
                                ))}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-white dark:bg-dark-200 border border-slate-100 dark:border-slate-800 self-start">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-white dark:bg-dark-100 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={translations[lang]?.placeholder || translations.en.placeholder}
                            className="flex-1 bg-slate-100 dark:bg-dark-200 rounded-full px-4 py-2.5 text-[13px] font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow"
                        />
                        <button type="submit" disabled={!input.trim()} className="p-2.5 bg-indigo-600 text-white rounded-full bg-opacity-90 hover:bg-opacity-100 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all shadow-md">
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Action Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-white dark:bg-dark-100 rounded-full shadow-2xl shadow-indigo-500/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group ring-4 ring-indigo-500 overflow-hidden relative"
                >
                    <img src={isRunning ? "/images/ai_boy_running.png" : "/images/ai_boy_avatar.png"} alt="AI Boy" className={`w-full h-full object-cover transition-transform duration-500 ${isRunning ? 'scale-125 translate-x-1' : 'group-hover:scale-110'}`} />
                    {!isRunning && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-indigo-600 animate-pulse"></span>}
                </button>
            )}
        </div>
    );
};

export default AIAssistant;
