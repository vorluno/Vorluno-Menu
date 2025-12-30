# Guía de Acceso al Panel Admin - CodeMenu V3

## 🔐 Paso 1: Crear Usuario Admin en Supabase

### Opción A: Desde Supabase Dashboard (Recomendado)

1. **Ve a tu proyecto en Supabase**
   - https://supabase.com/dashboard

2. **Navega a Authentication > Users**
   - Click en "Add user" o "Create user"

3. **Crea un usuario con email y password:**
   ```
   Email: admin@example.com
   Password: (elige una contraseña segura)
   ```

4. **Confirmar el email automáticamente:**
   - En el dashboard de Supabase, después de crear el usuario
   - Click en los 3 puntos del usuario > "Send magic link" o marca como confirmado

### Opción B: Registro desde la App

Si tienes habilitado el registro público:

1. Ve a: http://localhost:3000/es/login
2. Click en "Sign Up" (si está disponible)
3. Registra tu cuenta
4. Verifica el email (si está configurado)

---

## 🚀 Paso 2: Acceder al Admin

1. **Abre el navegador en:**
   ```
   http://localhost:3000/es/login
   ```

2. **Ingresa tus credenciales:**
   - Email: admin@example.com
   - Password: (tu contraseña)

3. **Serás redirigido automáticamente a:**
   ```
   http://localhost:3000/es/dashboard
   ```

---

## 📊 Paso 3: Ejecutar SQL (IMPORTANTE)

**ANTES de usar el admin, DEBES ejecutar el SQL:**

1. **Abre Supabase Dashboard**
   - SQL Editor

2. **Ejecuta el archivo completo:**
   - Copia todo el contenido de `supabase-migrations.sql`
   - Pégalo en SQL Editor
   - Click en "Run"

3. **Verifica que se crearon:**
   - ✅ Tabla `restaurant_settings`
   - ✅ Tabla `product_views`
   - ✅ Tabla `category_views`
   - ✅ Columna `tags` en tabla `products`

---

## 🎯 Funcionalidades del Admin

### 1. Dashboard Principal
**URL:** http://localhost:3000/es/dashboard

**Muestra:**
- Total de categorías
- Total de productos
- Productos activos
- Productos destacados

### 2. Categorías
**URL:** http://localhost:3000/es/dashboard/categories

**Puedes:**
- ✅ Ver todas las categorías
- ✅ Crear nueva categoría
- ✅ Editar categoría existente
- ✅ Soft delete (desactivar)
- ✅ Restaurar categoría
- ✅ Cambiar orden de visualización

**Campos:**
- Nombre ES/EN
- Slug (URL friendly)
- Sort order
- Activo/Inactivo

### 3. Productos
**URL:** http://localhost:3000/es/dashboard/products

**Puedes:**
- ✅ Ver todos los productos por categoría
- ✅ Crear nuevo producto
- ✅ Editar producto existente
- ✅ Soft delete (desactivar)
- ✅ Restaurar producto
- ✅ Subir imagen
- ✅ **Agregar tags/alérgenos** (NUEVO V3)
- ✅ **Marcar como destacado** (NUEVO V3)

**Campos:**
- Categoría
- Nombre ES/EN
- Descripción ES/EN
- Precio principal
- Precio alternativo (opcional: copa, jarra)
- Imagen URL
- Sort order
- Activo/Inactivo
- **Featured** (aparece en carousel home)
- **Tags** (9 opciones disponibles):
  - 🥬 Vegetariano
  - 🌱 Vegano
  - 🌾 Sin Gluten
  - 🌶️ Picante
  - 🥜 Contiene Nueces
  - 🥛 Contiene Lácteos
  - 🦐 Contiene Mariscos
  - ⭐ Especial del Chef
  - ✨ Nuevo

### 4. Analytics (NUEVO V3)
**URL:** http://localhost:3000/es/dashboard/analytics

**Muestra:**
- 📊 **Vistas Hoy:** Total con comparación vs ayer
- 📈 **Vistas por Día:** Gráfico últimos 7 días
- 🏆 **Top 10 Productos:** Más vistos en la semana
- 📁 **Top 5 Categorías:** Más visitadas en la semana

**Nota:** Los datos se llenan automáticamente cuando los usuarios:
- Abren el modal de un producto (vista pública)
- Navegan a una página de categoría

### 5. Settings (NUEVO V3)
**URL:** http://localhost:3000/es/dashboard/settings

**Configurar:**

#### **Información del Restaurante:**
- Nombre
- Teléfono
- WhatsApp
- Instagram
- Dirección

#### **Horarios por Día:**
- Lunes a Domingo
- Hora apertura (formato 24h)
- Hora cierre (formato 24h)
- Checkbox "Cerrado" por día
- Soporte para cierre después de medianoche (ej: 02:00 AM)

**Impacto en vista pública:**
- Badge "Abierto/Cerrado" en Header (actualiza en tiempo real)
- Horarios completos en Footer
- Día actual resaltado

---

## 🧪 Testing del Admin

### Test 1: Crear Categoría
1. Dashboard > Categorías > "Nueva Categoría"
2. Llenar:
   ```
   Nombre ES: Bebidas
   Nombre EN: Drinks
   Slug: bebidas
   Sort Order: 1
   ```
3. Guardar
4. Verificar que aparece en la tabla
5. Ir al menú público → Debe aparecer la categoría

### Test 2: Crear Producto con Tags
1. Dashboard > Productos > "Nuevo Producto"
2. Llenar:
   ```
   Categoría: Bebidas
   Nombre ES: Mojito Clásico
   Nombre EN: Classic Mojito
   Precio: 12.00
   Featured: ✅ (marcar)
   Tags: ✅ Vegetariano, ✅ Sin Gluten
   ```
3. Guardar
4. Verificar:
   - En tabla de productos debe mostrar estrella (featured)
   - En menú público debe aparecer en carousel
   - Tags visibles en card (iconos) y modal (texto)

### Test 3: Configurar Horarios
1. Dashboard > Settings
2. Configurar horarios:
   ```
   Lunes: 17:00 - 00:00
   Martes: 17:00 - 00:00
   Miércoles: Cerrado
   Jueves: 17:00 - 00:00
   Viernes: 17:00 - 02:00 (pasada medianoche)
   Sábado: 17:00 - 02:00
   Domingo: 12:00 - 22:00
   ```
3. Guardar
4. Verificar en vista pública:
   - Header muestra badge correcto según hora actual
   - Footer muestra todos los horarios
   - Día actual resaltado en dorado

### Test 4: Ver Analytics
1. **Generar vistas:**
   - Navega en vista pública
   - Abre varios productos (modales)
   - Visita diferentes categorías

2. **Ver estadísticas:**
   - Dashboard > Analytics
   - Debe mostrar:
     - Conteo de vistas
     - Productos más vistos
     - Categorías más visitadas
     - Gráfico de tendencia

---

## 🎨 Probar Modo Oscuro

1. En cualquier página (pública o admin)
2. Click en icono sol/luna en header
3. Seleccionar:
   - ☀️ Light
   - 🌙 Dark
   - 💻 System

**El modo se aplica a:**
- Menú público
- Dashboard admin
- Todos los modales y componentes

---

## ⚠️ Troubleshooting

### "No puedo hacer login"
- ✅ Verifica que el usuario esté creado en Supabase
- ✅ Verifica que el email esté confirmado
- ✅ Revisa las variables de entorno (.env.local)

### "No veo horarios en el footer"
- ✅ Ejecuta el SQL de `restaurant_settings`
- ✅ Configura horarios desde Settings
- ✅ Refresca la página

### "Analytics no muestra datos"
- ✅ Ejecuta el SQL de `product_views` y `category_views`
- ✅ Navega en vista pública para generar vistas
- ✅ Espera unos segundos y recarga

### "Tags no se guardan"
- ✅ Ejecuta el SQL que agrega columna `tags`
- ✅ Verifica tipos en `database.ts`
- ✅ Reinicia el servidor dev

### "Featured carousel no aparece"
- ✅ Marca al menos 1 producto como "Featured"
- ✅ Verifica que el producto esté activo
- ✅ Refresca la home page

---

## 📱 Probar PWA en Móvil

1. **Build para producción:**
   ```bash
   npm run build
   npm start
   ```

2. **Obtén tu IP local:**
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

3. **Desde tu móvil:**
   - Conecta a la misma red WiFi
   - Abre: `http://TU_IP:3000`

4. **Instalar PWA:**
   - **Android (Chrome):** Menu > "Agregar a pantalla de inicio"
   - **iOS (Safari):** Share > "Agregar a pantalla de inicio"

5. **Verificar:**
   - ✅ Icono en pantalla de inicio (cuando los generes)
   - ✅ Abre en fullscreen
   - ✅ Funciona offline (básico)

---

## ✅ Checklist Completo

- [ ] Usuario admin creado en Supabase
- [ ] SQL ejecutado (restaurant_settings, analytics, tags)
- [ ] Login exitoso al admin
- [ ] Categoría de prueba creada
- [ ] Producto de prueba creado con tags
- [ ] Producto marcado como featured
- [ ] Horarios configurados en Settings
- [ ] Analytics muestra datos
- [ ] Modo oscuro funciona
- [ ] Featured carousel visible en home
- [ ] Tags visibles en productos
- [ ] Badge "Abierto/Cerrado" funciona

---

## 🎉 Todo Listo

Si completaste el checklist, tu admin está 100% funcional con todas las features V3:

- ✅ Modo Oscuro
- ✅ Horarios del Restaurante
- ✅ Tags y Alérgenos
- ✅ Carousel de Destacados
- ✅ Analytics Básico
- ✅ PWA Manifest

**¡Disfruta de tu menú digital premium!** 🍸
