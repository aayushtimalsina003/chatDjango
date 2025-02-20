from django.db.models import Count
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.permissions import IsAuthenticated

from .schema import server_list_docs
from .models import Server
from .serializer import ServerSerializer

class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()
    # permission_classes = [IsAuthenticated]

    @server_list_docs
    def list(self, request):
        """
    Retrieves a list of servers with optional filtering based on query parameters.

    Query Parameters:
        - category (str, optional): Filter servers by category name.
        - qty (int, optional): Limit the number of servers returned.
        - by_user (bool, optional): If "true", filter servers where the authenticated user is a member.
        - by_serverid (int, optional): Retrieve a specific server by its ID.
        - with_num_members (bool, optional): If "true", include the number of members in each server.

    Authentication:
        - Required if filtering by `by_user` or `by_serverid`.
        - Raises AuthenticationFailed if an unauthenticated user attempts to use these filters.

    Returns:
        - JSON response containing a list of serialized servers.
        - Each server includes additional `num_members` field if `with_num_members=true` is set.

    Raises:
        - AuthenticationFailed: If `by_user` or `by_serverid` is used without authentication.
        - ValidationError: If the provided `by_serverid` does not exist or has an invalid format.
        - ValidationError: If `qty` is not a valid integer.

    Example Request:
        GET /api/servers/?category=gaming&qty=5&with_num_members=true
    """
        category = request.query_params.get("category")
        qty = request.query_params.get("qty") 
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # if by_user or by_serverid and not request.user.is_authenticated:
        #     raise AuthenticationFailed()

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()

        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))
            
        if qty:
            self.queryset = self.queryset[:int(qty)]

        if by_serverid:
                if not request.user.is_authenticated: 
                    raise AuthenticationFailed()
                
                try:
                    self.queryset = self.queryset.filter(id=by_serverid)
                    if not self.queryset.exists(): 
                     raise ValidationError(detail=f"Server with id {by_serverid} not  found")
                except ValueError:
                    raise ValidationError(detail="Server value error")


        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})  
        return Response(serializer.data)