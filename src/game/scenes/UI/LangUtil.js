// Singleton
class LangUtil {
    constructor(){
        const availableLangs = ['en-US', 'es-ES'];
        const systemLanguage = Intl.DateTimeFormat().resolvedOptions().locale;
        // Check if the browser language is available in the game
        this.lang = availableLangs.includes(systemLanguage) ? systemLanguage : availableLangs[0];
        // Lang data provided on preload
        this.langData = {};
    }
    // 🗣️ Getters and Setters
    getLang(){
        return this.lang;
    }
    getLangs(){
        return Object.keys(this.langData);
    }
    setLang(lang){
        if(!this.langData[lang]) return;
        this.lang = lang;
    }
    // Returns corresponding text for the current language.
    get(keys){
        keys = keys.split('.');
        if(!keys.length) return this.langData[this.lang][keys] || keys;
        var result = this.langData[this.lang][keys.shift()];
        if (keys.length > 1) keys.forEach(element => {
            result = result[element];
        });
        return result;
    }
}
// Export singleton instance
const langs = new LangUtil();
export default langs;