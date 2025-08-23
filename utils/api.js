export async function apiCreate(url, data) {
  try {    
    console.log(data);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || 'Error al crear el recurso');
    }

    return await res.json();
  } catch (err) {
    console.error('apiCreate error:', err);
    throw err;
  }
};

export async function apiRequest(url, method = 'GET', body = null) {
  try {
    const options = { 
      method, 
      headers: { 'Content-Type': 'application/json' } 
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || 'Error en la petición');
    }

    return await res.json();
  } catch (err) {
    console.error('apiRequest error:', err);
    throw err;
  }
}

export async function apiUpdate(url, data) {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || 'Error al actualizar el recurso');
    }

    return await res.json();
  } catch (err) {
    console.error('apiUpdate error:', err);
    throw err;
  }
}


export async function apiDelete(url) {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || 'Error al eliminar el recurso');
    }

    return await res.json();
  } catch (err) {
    console.error('apiDelete error:', err);
    throw err;
  }
}