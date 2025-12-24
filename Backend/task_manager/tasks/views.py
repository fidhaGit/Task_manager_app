from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'priority']

    def get_queryset(self):
        queryset = Task.objects.filter(user=self.request.user)

        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')

        valid_status = ['PENDING', 'COMPLETED']
        valid_priority = ['LOW', 'MEDIUM', 'HIGH']

        if status and status.upper() in valid_status:
            queryset = queryset.filter(status=status.upper())

        if priority and priority.upper() in valid_priority:
            queryset = queryset.filter(priority=priority.upper())

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def progress(self, request):
        total = Task.objects.filter(user=request.user).count()
        completed = Task.objects.filter(
            user=request.user, status='COMPLETED'
        ).count()

        percentage = (completed / total) * 100 if total > 0 else 0

        return Response({
            'total_tasks': total,
            'completed_tasks': completed,
            'progress_percentage': round(percentage, 2)
        })
