# Django Work Flow

## Initial setup

1. Create venv, and install django within venv

   ```
   python3 -m venv venv
   source venv/bin/activate
   pip install django
   ```

2. Create Django project and app

   ```python
   django-admin startproject project_name
   cd project_name
   python manage.py startapp app_name
   ```

3. Start git

   ```
   git init
   git add .
   git commit -m 'start app'
   ```

4. Create urls.py under app directory, add path('route/', include(appname.urls) ) in url patterns array in project's urls.py

   ```
   @app's urls.py
   from django.urls import path
   from . import views
   urlpatterns = [
   ]
   
   @project's urls.py
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('route/', include('appname.urls')),
   ]
   ```

5. Add 'appname.appnameConfig'(check it from apps.py file) in installed_app array.

   ```
   @settings.py
   INSTALLED_APPS = [
   		'appname.apps.appnameConfig',
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
   ]
   
   ALLOWED_HOSTS = ['127.0.0.1', ]
   ```

6. Change sqlite into Postgres. -> create postgres database first and then add this setup.

   ```
   @settings.py
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'NAME': 'db_name',
           'USER': 'postgres',
           'PASSWORD': 'postgres',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   ```

   

## Model Setup

```python
@models.py
#django built-in user
from django.contrib.auth.models import User

#create post model
class post(models.Model):
  title = models.CharField(max_length = 30)
```

Run this command in terminal to convert django orm into sql queries

```
python manage.py makemigrations
python manage.py migrate
```

Create superuser

```
python manage.py createsuperuser
```



## End Point Setup

REST has 7 end points. 

```
index, detail, new, create, edit, update, delete
```

```python
@views.py
def detail(request,post_id):
  context = {'posts' : Post.objects.filter(post_id=1)} 
  return render(request,'detail.html', context )

@urls.py
from . import post_views
urlpatterns = [
    path('<int:note_id>/detail/', post_views.detail, name='detail'),
]

@template.html
{% urls 'detail' %}
```



### REST API Skeleton

@**views.py**

```python
from django.shortcuts import render

def index(request):
    pass

def detail(request, post_id):
    pass

def new(request):
    pass

def create(request):
    pass

def edit(request, post_id):
    pass

def update(request, post_id):
    pass

def delete(request, post_id):
    pass
```

@**urls.py**

```python
from django.urls import path
from . import views

urlpatterns = [
    path('/', views.index, name='index'),
    path('<int:post_id>/', views.detail, name='detail'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
    path('<int:post_id>/edit/', views.edit, name='edit'),
    path('<int:post_id>/update/', views.update, name='update'),
    path('<int:post_id>/delete/', views.delete, name='delete'),
]
```



## Testing with postman

Add @csrf_exempt to the function, and send raw-json data, add 'content-type' application-json to the header.

in django file, this data will be received using 'request.body' instead of 'request.post'

​    data = json.loads(request.body.decode('utf-8'))

## ## Template

- django convention 
- render(request,'appname/index.html') => render will automatically look into templates folder.

```
app
	|_templates
			 |_ appname
 					|_ usercreation.html
```



## Form template
