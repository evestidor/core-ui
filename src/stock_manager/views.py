from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'stock_manager/home.html'
