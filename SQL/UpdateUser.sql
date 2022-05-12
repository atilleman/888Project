USE [888Proj]
GO
/****** Object:  StoredProcedure [dbo].[usp_Update_User]    Script Date: 5/12/2022 12:46:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[usp_Update_User](@UserID int, @FirstName nvarchar(50), @LastName nvarchar(100), 
										 @UserName nvarchar(Max), @DOB datetime)
	
AS

	SET NOCOUNT ON;

	UPDATE Users
	SET FirstName = @FirstName,
		LastName = @LastName,
		UserName = @UserName,
		DOB = @DOB
	WHERE ID = @UserID