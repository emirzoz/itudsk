document.addEventListener('DOMContentLoaded', function() {
  const suggestionForm = document.getElementById('speaker-suggestion-form');

  if (suggestionForm) {
    suggestionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const suggestionInput = suggestionForm.querySelector('input[name="speaker_suggestion"]');
      const suggestion = suggestionInput.value.trim();
      if (suggestion) {
        const suggestions = JSON.parse(localStorage.getItem('speakerSuggestions') || '[]');
        const timestamp = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
        suggestions.push({ timestamp, suggestion });
        localStorage.setItem('speakerSuggestions', JSON.stringify(suggestions));
        suggestionInput.value = '';
        alert('Öneriniz kaydedildi! Teşekkür ederiz.');
      }
    });
  }
});
