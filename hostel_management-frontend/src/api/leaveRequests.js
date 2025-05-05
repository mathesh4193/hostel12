// Example API endpoint handler
export const updateLeaveRequest = async (requestId, status) => {
  try {
    const response = await fetch('/api/leave-requests/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId,
        status,
        updatedAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update request');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};