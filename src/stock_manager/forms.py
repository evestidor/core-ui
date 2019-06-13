from django import forms


class AddStockForm(forms.Form):
    symbol = forms.CharField(max_length=255)

    def save(self):
        symbol = self.cleaned_data['symbol']
