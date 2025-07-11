"""Apply latest model changes

Revision ID: 73a79fcd7b9e
Revises: 8d69bfd65861
Create Date: 2025-06-26 20:07:14.685156

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '73a79fcd7b9e'
down_revision = '8d69bfd65861'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('meetings', schema=None) as batch_op:
        batch_op.alter_column('group_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('meetings', schema=None) as batch_op:
        batch_op.alter_column('group_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
