from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializer import MessageSerializer

list_message_docs = extend_schema(
    responses=MessageSerializer(many=True),
    tags=["channel"],
    parameters=[
        OpenApiParameter(
            name="channel_id",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="ID of the channel",
        )
    ],
)
