# server/books/serializers.py

from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    # add a camelCase alias on top of the snake_case model field
    releaseYear = serializers.IntegerField(source='release_year')

    class Meta:
        model = Book
        # list exactly the fields you want (note: omit 'release_year')
        fields = ['id', 'title', 'author', 'releaseYear']