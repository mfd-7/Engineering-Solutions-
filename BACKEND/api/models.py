from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Fire Safety', 'Fire Safety'),
        ('Mechanical', 'Mechanical'),
        ('LPG Systems', 'LPG Systems'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, db_index=True)
    client = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    scope = models.TextField()
    year = models.CharField(max_length=20, default='2020-Present')
    image = models.CharField(max_length=255, default='/images/hero.jpg')
    featured = models.BooleanField(default=False)
    highlight = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']
        verbose_name = "Mega Project"
        verbose_name_plural = "Mega Projects"

    def __str__(self):
        return f"{self.title} ({self.category})"


class Equipment(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, db_index=True)
    brand = models.CharField(max_length=100)
    origin = models.CharField(max_length=100)
    description = models.TextField()
    image = models.CharField(max_length=255)
    specs = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']
        verbose_name = "Industrial Equipment"
        verbose_name_plural = "Industrial Equipment Catalog"

    def __str__(self):
        return f"{self.name} - {self.brand}"


class Lead(models.Model):
    STATUS_CHOICES = [
        ('New', 'New Inquiry'),
        ('Under Review', 'Under Engineering Review'),
        ('Contacted', 'Client Contacted'),
        ('Proposal Sent', 'Proposal Sent'),
        ('Closed', 'Closed / Won'),
    ]

    full_name = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    project_type = models.CharField(max_length=100)
    site_sqft = models.CharField(max_length=100, blank=True)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=30, default='New', choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Client Quote / Lead"
        verbose_name_plural = "Client Quotes & Inquiries"

    def __str__(self):
        return f"{self.company} - {self.full_name} ({self.project_type})"

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.CharField(max_length=255)
    caption = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']
        verbose_name = "Project Image"
        verbose_name_plural = "Project Images"

    def __str__(self):
        return f"Image for {self.project.title}"

class Certification(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    year = models.CharField(max_length=20, blank=True)
    image = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', 'id']
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"

    def __str__(self):
        return f"{self.title} by {self.issuer}"
