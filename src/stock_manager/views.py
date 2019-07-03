from django.conf import settings
from django.views.generic import TemplateView


class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        ctx = super().get_context_data(*args, **kwargs)
        ctx['URL_PREFIX'] = settings.URL_PREFIX
        ctx['API_GATEWAY_URL'] = settings.API_GATEWAY_URL
        return ctx
