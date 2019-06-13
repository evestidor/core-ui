from django.urls import reverse_lazy
from django.views.generic import (
    FormView,
    TemplateView,
)

from .forms import AddStockForm


class Index(TemplateView):
    template_name = 'index.html'


class AddStockView(FormView):
    form_class = AddStockForm
    success_url = reverse_lazy('index')

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)
