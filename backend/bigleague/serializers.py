from rest_framework import serializers
from .models import Lead, Playergeneration

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'message']

class PlayergenerationSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Playergeneration
        fields = ['url', 'id', 'name', 'suit', 'age', 'pv', 'epv',
                  'contract', 't_option', 'p_option', 'renew',
                  'salary', 'grade', 'team']

        read_only_fields = ['url', 'id']

    def get_url(self, obj):
        # request
        request = self.context.get("request")
        return obj.get_api_url(request=request)