import { copticToTasbeha, tasbehaByRules } from '../tasbeha-coptic';

describe('Coptic in English letters as tasbeha.org writes it', () => {
  test('words as Tasbeha spells them', () => {
    expect(copticToTasbeha('Ⲡⲉⲕⲑ̀ⲣⲟⲛⲟⲥ Ⲫϯ ϣⲁ ⲉ̀ⲛⲉϩ ⲛ̀ⲧⲉ ⲡⲓⲉ̀ⲛⲉϩ:')).toBe('Pekethronos Efnoti sha eneh ente pi-eneh:');
    expect(copticToTasbeha('ⲟⲩⲟϩ ⲡⲓϣ̀ⲃⲱⲧ ⲙ̀ⲡ̀ⲥⲱⲟⲩⲧⲉⲛ')).toBe('o-woh pi-eshvot emepsoouten');
  });

  test('the rules write a word Tasbeha does not have in its style', () => {
    expect(tasbehaByRules('ⲉⲑⲟⲩⲁⲃ')).toBe('ethowab');
    expect(tasbehaByRules('ⲡⲉⲛϭⲟⲓⲥ')).toBe('penshois');
    expect(tasbehaByRules('ⲁⲗⲗⲏⲗⲟⲩⲓⲁ')).toBe('alleelouia');
    expect(tasbehaByRules('ⲛⲓⲁ̀ⲅⲅⲉⲗⲟⲥ')).toBe('ni-angelos');
    expect(tasbehaByRules('ⲫⲏⲉⲑⲛⲁⲁ̀ⲙⲟⲛⲓ')).toBe('fee-ethna-amoni');
  });

  test('keeps lines, punctuation and words in other letters', () => {
    expect(copticToTasbeha('People:\n\nⲁⲗⲗⲏⲗⲟⲩⲓⲁ.')).toBe('People:\n\nalleelouia.');
  });
});
