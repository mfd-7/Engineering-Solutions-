from django.contrib import admin
from .models import Project, Equipment, Lead

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'client', 'location', 'featured', 'year')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'client', 'location', 'scope')
    list_editable = ('featured',)


@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'origin')
    list_filter = ('category', 'brand')
    search_fields = ('name', 'brand', 'origin', 'description')


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('company', 'full_name', 'phone', 'email', 'project_type', 'status', 'created_at')
    list_filter = ('status', 'project_type', 'created_at')
    search_fields = ('company', 'full_name', 'email', 'phone', 'message')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
